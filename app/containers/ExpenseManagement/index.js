/**
 *
 * ExpenseManagement
 *
 */

import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Badge,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import Table from 'components/Table';
import AlertPopupHandler from 'components/AlertPopup/AlertPopupHandler';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import indianNumberFormatter from 'utils/indianNumberFormatter';
import history from 'utils/history';
import { EXPENSE } from 'utils/appConstants';
import { parseDate } from 'utils/dateTimeHelpers';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function ExpenseManagement() {
  useInjectReducer({ key: 'expenseManagement', reducer });
  const dispatch = useDispatch();

  const expenses = useSelector(selectors.expenses);
  const paginationDetails = useSelector(selectors.paginationDetails);

  useEffect(() => {
    dispatch(operations.fetchExpenses({ page: 1 }));
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
          onClick={() => dispatch(operations.fetchExpenses({ page: 1 }))}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={() =>
            dispatch(
              operations.fetchExpenses({
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
                  operations.fetchExpenses({
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
              operations.fetchExpenses({
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
              operations.fetchExpenses({
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
    <div className="expenseManagement mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Expense Management</title>
        <meta name="description" content="Description of Expense Management" />
      </Helmet>
      <Row className="mt-3 d-flex justify-content-between align-items-center">
        <Col>
          <h3>Expenses</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={() => history.push('/expense/add')}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>{' '}
            <span className="btn-inner--text">Add Expense</span>
          </Button>
        </Col>
      </Row>

      <Table
        bootstrap4
        striped
        search={false}
        bordered={false}
        keyField="_id"
        data={expenses}
        paginationOptions={null}
        columns={[
          {
            text: 'Transaction Date',
            dataField: 'transactionDate',
            formatter: cell => parseDate(cell),
          },
          {
            text: 'Title',
            dataField: 'title',
            formatter: cell => cell || '-',
          },
          {
            text: 'Type',
            dataField: 'type',
            formatter: cell => (
              <Badge color={cell === EXPENSE ? 'danger' : 'success'}>
                {cell}
              </Badge>
            ),
          },
          {
            text: 'Amount',
            dataField: 'amount',
            formatter: cell => indianNumberFormatter(cell),
          },
          {
            text: 'Notes',
            dataField: 'notes',
            formatter: cell => cell || '-',
          },
          {
            text: 'Actions',
            dummyField: true,
            formatter: (cell, { _id, title }) => (
              <>
                <Button
                  title="Edit Expense"
                  type="button"
                  color="primary"
                  size="sm"
                  className="btn-sm"
                  onClick={() => history.push(`/expense/add?id=${_id}`)}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-edit" />
                  </span>
                </Button>
                <Button
                  title="Delete Expense"
                  type="button"
                  color="danger"
                  size="sm"
                  className="btn-sm ms-1"
                  onClick={() => onDelete(_id, title)}
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

export default ExpenseManagement;
