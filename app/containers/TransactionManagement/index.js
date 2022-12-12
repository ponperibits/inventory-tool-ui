/* eslint-disable react/prop-types */
/**
 *
 * TransactionManagement
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
import Table from 'components/Table';
import AlertPopupHandler from 'components/AlertPopup/AlertPopupHandler';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { useInjectReducer } from 'utils/injectReducer';
import indianNumberFormatter from 'utils/indianNumberFormatter';
import history from 'utils/history';
import { parseDate } from 'utils/dateTimeHelpers';
import { useCookies } from 'react-cookie';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function TransactionManagement() {
  useInjectReducer({ key: 'transactionManagement', reducer });
  const dispatch = useDispatch();
  const [cookie] = useCookies(['user']);

  const transactions = useSelector(selectors.transactions);
  const paginationDetails = useSelector(selectors.paginationDetails);

  useEffect(() => {
    dispatch(operations.fetchTransactions({ page: 1 }));
  }, []);

  const expandRowProps = {
    // className: 'p-0 pl-4',
    onlyOneExpanding: true,
    // eslint-disable-next-line react/prop-types
    renderer: ({ records }) => (
      <Table
        bootstrap4
        striped
        search={false}
        bordered={false}
        keyField="_id"
        data={records}
        paginationOptions={null}
        columns={[
          { text: 'Product', dataField: 'productId.name' },
          {
            text: 'Quantity',
            dataField: 'noOfUnits',
            formatter: cell => indianNumberFormatter(cell, true),
          },
          {
            text: 'Amount',
            dataField: 'amount',
            formatter: cell =>
              `${selectors.getCurrency(cookie)} ${indianNumberFormatter(cell)}`,
          },
          {
            text: 'Product Units Balance',
            dataField: 'prodUnitsBalance',
            formatter: cell => indianNumberFormatter(cell, true),
          },
          {
            text: 'Supplier',
            dataField: 'supplierId.name',
            formatter: cell => cell || '-',
          },
          {
            text: 'Customer',
            dataField: 'customerId.name',
            formatter: cell => cell || '-',
          },
        ]}
      />
    ),
    showExpandColumn: true,
    expandColumnPosition: 'right',
    expandColumnRenderer: ({ expanded }) =>
      expanded ? (
        <i className="fas fa-chevron-up" />
      ) : (
        <i className="fas fa-chevron-down" />
      ),
    expandHeaderColumnRenderer: () => 'Expand Rows',
  };

  const getPagination = () => (
    <Pagination
      className="d-flex justify-content-end text-end"
      aria-label="Page navigation example"
      size="sm"
    >
      <PaginationItem>
        <PaginationLink
          first
          onClick={() => dispatch(operations.fetchTransactions({ page: 1 }))}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={() =>
            dispatch(
              operations.fetchTransactions({
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
                  operations.fetchTransactions({
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
              operations.fetchTransactions({
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
              operations.fetchTransactions({
                page: paginationDetails.totalPages,
              }),
            )
          }
        />
      </PaginationItem>
    </Pagination>
  );

  const onDelete = id => {
    AlertPopupHandler.open({
      onConfirm: () =>
        dispatch(operations.onDelete(id, { page: paginationDetails.page })),
      confirmBtnText: 'Delete',
      text: (
        <>You are about to delete this transaction. Do you want to continue?</>
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
        <title>Transaction Management</title>
        <meta
          name="description"
          content="Description of Transaction Management"
        />
      </Helmet>
      <Row className="mt-3 d-flex justify-content-between align-items-center">
        <Col>
          <h3>Transactions</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={() => history.push('/transaction/add')}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>{' '}
            <span className="btn-inner--text">Add Transaction</span>
          </Button>
        </Col>
      </Row>

      <Table
        bootstrap4
        striped
        search={false}
        bordered={false}
        keyField="_id"
        data={transactions}
        paginationOptions={null}
        expandRow={expandRowProps}
        columns={[
          {
            text: 'Party Name',
            dataField: 'supplierId.name',
            formatter: (cell, row) => (
              <span className="hover-pointer text-primary">
                {cell || get(row, 'customerId.name')}
              </span>
            ),
          },
          {
            text: 'Date',
            dataField: 'transactionDate',
            formatter: cell => (
              <span className="hover-pointer">{parseDate(cell)}</span>
            ),
          },
          {
            text: 'Amount',
            dataField: 'amount',
            formatter: cell =>
              `${selectors.getCurrency(cookie)} ${indianNumberFormatter(cell)}`,
          },
          {
            text: 'Actions',
            dummyField: true,
            formatter: (cell, { _id }) => (
              <>
                <Button
                  title="Edit Transaction"
                  type="button"
                  color="primary"
                  size="sm"
                  className="btn-sm"
                  onClick={() => history.push(`/transaction/add?id=${_id}`)}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-edit" />
                  </span>
                </Button>
                <Button
                  title="Delete Transaction"
                  type="button"
                  color="danger"
                  size="sm"
                  className="btn-sm ms-1"
                  onClick={() => onDelete(_id)}
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
    </div>
  );
}

export default TransactionManagement;
