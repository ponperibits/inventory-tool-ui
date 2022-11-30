/**
 *
 * ProductManagement
 *
 */

import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function ProductManagement() {
  useInjectReducer({ key: 'productManagement', reducer });
  const dispatch = useDispatch();

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
          {
            text: 'Price',
            dataField: 'price',
          },
          {
            text: 'Selling Price',
            dataField: 'sellingPrice',
          },
          {
            text: 'No. of Units',
            dataField: 'noOfUnits',
          },
          {
            text: 'Actions',
            dummyField: true,
            formatter: (cell, { _id }) => (
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
              </>
            ),
          },
        ]}
      />
      <Row>
        <Col className="text-end ms-auto">{getPagination()}</Col>
      </Row>
    </div>
  );
}

export default ProductManagement;
