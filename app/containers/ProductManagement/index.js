/**
 *
 * ProductManagement
 *
 */

import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import { Helmet } from 'react-helmet';
import Table from 'components/Table';
import AlertPopupHandler from 'components/AlertPopup/AlertPopupHandler';
import PrintPriceModal from 'components/PrintPriceModal';
import { useDispatch, useSelector } from 'react-redux';
import indianNumberFormatter from 'utils/indianNumberFormatter';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import { useCookies } from 'react-cookie';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function ProductManagement() {
  useInjectReducer({ key: 'productManagement', reducer });
  const dispatch = useDispatch();
  const [cookie] = useCookies(['user']);
  const [labelDetails, setLabelDetails] = useState({});
  const [showModal, setShowModal] = useState(false);

  const products = useSelector(selectors.products);
  const paginationDetails = useSelector(selectors.paginationDetails);

  useEffect(() => {
    dispatch(operations.fetchProducts({ page: 1 }));
  }, []);

  const getPagination = () => (
    <Pagination
      className="d-flex justify-content-end text-end"
      aria-label="Page navigation example"
      size="sm"
    >
      <PaginationItem>
        <PaginationLink
          first
          onClick={() => dispatch(operations.fetchProducts({ page: 1 }))}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={() =>
            dispatch(
              operations.fetchProducts({
                page: paginationDetails.prevPage,
              }),
            )
          }
          previous
          {...(paginationDetails.hasPrevPage ? {} : { disabled: true })}
        />
      </PaginationItem>
      {paginationDetails.pageNumbers &&
        paginationDetails.pageNumbers.map(pageNumber => (
          <PaginationItem active={paginationDetails.page === pageNumber}>
            <PaginationLink
              onClick={() =>
                dispatch(
                  operations.fetchProducts({
                    page: pageNumber,
                  }),
                )
              }
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
      <PaginationItem>
        <PaginationLink
          onClick={() =>
            dispatch(
              operations.fetchProducts({
                page: paginationDetails.nextPage,
              }),
            )
          }
          next
          {...(paginationDetails.hasNextPage ? {} : { disabled: true })}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          last
          onClick={() =>
            dispatch(
              operations.fetchProducts({
                page: paginationDetails.totalPages,
              }),
            )
          }
        />
      </PaginationItem>
    </Pagination>
  );

  const onDelete = (id, name) => {
    AlertPopupHandler.open({
      onConfirm: () =>
        dispatch(operations.onDelete(id, { page: paginationDetails.page })),
      confirmBtnText: 'Delete',
      text: (
        <>
          You are about to delete{' '}
          <span className="fw-bold fst-italic">{name}</span>. Do you want to
          continue?
        </>
      ),
      data: {},
      warning: true,
      customClass: 'text-xs',
      btnSize: 'sm',
      confirmBtnBsStyle: 'danger',
      cancelBtnBsStyle: 'outline-danger',
    });
  };

  return (
    <div className="productManagement mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Product Management</title>
        <meta name="description" content="Description of Product Management" />
      </Helmet>
      <Row className="mt-3 d-flex justify-content-between align-items-center">
        <Col>
          <h3>Products</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={() => history.push('/product/add')}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>{' '}
            <span className="btn-inner--text">Add Product</span>
          </Button>
        </Col>
      </Row>

      <Table
        bootstrap4
        striped
        search={false}
        bordered={false}
        keyField="_id"
        data={products}
        paginationOptions={null}
        rowClasses={({ minStockWarning, noOfUnits }) =>
          noOfUnits < minStockWarning ? 'table-danger' : ''
        }
        columns={[
          {
            text: 'Name',
            dataField: 'name',
            formatter: (cell, { _id }) => (
              <span
                className="text-primary hover-pointer"
                onClick={() => history.push(`/product/view?id=${_id}`)}
                aria-hidden="true"
              >
                {cell}
              </span>
            ),
          },
          { text: 'SKU', dataField: 'sku' },
          {
            text: 'Price',
            dataField: 'price',
            formatter: cell =>
              `${selectors.getCurrency(cookie)} ${indianNumberFormatter(cell)}`,
          },
          {
            text: 'Selling Price',
            dataField: 'sellingPrice',
            formatter: cell =>
              `${selectors.getCurrency(cookie)} ${indianNumberFormatter(cell)}`,
          },
          {
            text: 'No. of Units',
            dataField: 'noOfUnits',
            formatter: cell => indianNumberFormatter(cell, true),
          },
          {
            text: 'Actions',
            dummyField: true,
            formatter: (cell, { _id, name, shortLabel, sellingPrice, sku }) => (
              <>
                <Button
                  title="Edit Product"
                  type="button"
                  color="primary"
                  size="sm"
                  className="btn-sm"
                  onClick={() => history.push(`/product/add?id=${_id}`)}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-edit" />
                  </span>
                </Button>
                <Button
                  title="View Prodct"
                  type="button"
                  color="info"
                  size="sm"
                  className="btn-sm ms-1 text-white"
                  onClick={() => history.push(`/product/view?id=${_id}`)}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-eye" />
                  </span>
                </Button>
                <Button
                  title="Print Label"
                  disabled={!sellingPrice || !sku || !name || !shortLabel}
                  type="button"
                  color="secondary"
                  size="sm"
                  className="btn-sm ms-1 text-white"
                  onClick={() => {
                    setLabelDetails({
                      name,
                      shortLabel,
                      sku,
                      sellingPrice,
                      currency: selectors.getCurrency(cookie),
                    });
                    setShowModal(true);
                  }}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-print" />
                  </span>
                </Button>
                <Button
                  title="View Prodct"
                  type="button"
                  color="danger"
                  size="sm"
                  className="btn-sm ms-1 text-white"
                  onClick={() => onDelete(_id, name)}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-trash" />
                  </span>
                </Button>
              </>
            ),
          },
        ]}
      />
      <Row>
        <Col className="text-end ms-auto">{getPagination()}</Col>
      </Row>
      <PrintPriceModal
        showModal={showModal}
        setShowModal={setShowModal}
        labelDetails={labelDetails}
      />
    </div>
  );
}

export default ProductManagement;
