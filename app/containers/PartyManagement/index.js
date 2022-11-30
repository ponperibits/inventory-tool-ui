/**
 *
 * PartyManagement
 *
 */

import React, { useEffect } from 'react';
import {
  Row,
  Col,
  Button,
  Badge,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import Table from 'components/Table';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import { SUPPLIER } from 'utils/appConstants';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function PartyManagement() {
  useInjectReducer({ key: 'partyManagement', reducer });
  const dispatch = useDispatch();

  const parties = useSelector(selectors.parties);
  const paginationDetails = useSelector(selectors.paginationDetails);

  useEffect(() => {
    dispatch(operations.fetchParties({ page: 1 }));
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
          onClick={() => dispatch(operations.fetchParties({ page: 1 }))}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={() =>
            dispatch(
              operations.fetchParties({
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
                  operations.fetchParties({
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
              operations.fetchParties({
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
              operations.fetchParties({
                page: paginationDetails.totalPages,
              }),
            )
          }
        />
      </PaginationItem>
    </Pagination>
  );

  return (
    <div className="partyManagement mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Party Management</title>
        <meta name="description" content="Description of PartyManagement" />
      </Helmet>
      <Row className="mt-3 d-flex justify-content-between align-items-center">
        <Col>
          <h3>Parties</h3>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            color="primary"
            className="btn-icon btn-3"
            type="button"
            onClick={() => history.push('/party/add')}
          >
            <span className="btn-inner--icon">
              <i className="fas fa-plus" />
            </span>{' '}
            <span className="btn-inner--text">Add Party</span>
          </Button>
        </Col>
      </Row>

      <Table
        bootstrap4
        striped
        search={false}
        bordered={false}
        keyField="_id"
        data={parties}
        paginationOptions={null}
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
            text: 'Phone',
            dataField: 'phone',
            formatter: cell => cell || '-',
          },
          {
            text: 'Type',
            dataField: 'type',
            formatter: cell => (
              <Badge color={cell === SUPPLIER ? 'danger' : 'success'}>
                {cell}
              </Badge>
            ),
          },
          {
            text: 'GST Number',
            dataField: 'gstNumber',
            formatter: cell => cell || '-',
          },
          {
            text: 'Address',
            dataField: 'address',
            formatter: cell => cell || '-',
          },
          {
            text: 'Actions',
            dummyField: true,
            formatter: (cell, { _id }) => (
              <>
                <Button
                  title="Edit Party"
                  type="button"
                  color="primary"
                  size="sm"
                  className="btn-sm"
                  onClick={() => history.push(`/party/add?id=${_id}`)}
                >
                  <span className="btn-inner--icon">
                    <i className="fas fa-edit" />
                  </span>
                </Button>
                <Button
                  title="View Party"
                  type="button"
                  color="info"
                  size="sm"
                  className="btn-sm ms-1 text-white"
                  onClick={() => history.push(`/party/view?id=${_id}`)}
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

export default PartyManagement;
