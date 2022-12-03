/**
 *
 * PartyManagement
 *
 */

import React, { useEffect, useState } from 'react';
import qs from 'query-string';
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
import AlertPopupHandler from 'components/AlertPopup/AlertPopupHandler';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import history from 'utils/history';
import { SUPPLIER, PARTY_FILTERS } from 'utils/appConstants';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export function PartyManagement() {
  useInjectReducer({ key: 'partyManagement', reducer });
  const dispatch = useDispatch();

  const parties = useSelector(selectors.parties);
  const paginationDetails = useSelector(selectors.paginationDetails);

  const [filterTab, setFilterTab] = useState(null);

  const buildQuery = (page = 1, initialFilter = null) => ({
    page,
    ...(filterTab && { type: filterTab }),
    ...(initialFilter && { type: initialFilter }),
  });

  useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    const { type } = qs.parse(location.search);
    if (type) {
      setFilterTab(type);
      dispatch(operations.fetchParties(buildQuery(1, type)));
    } else {
      dispatch(operations.fetchParties(buildQuery(1)));
    }
  }, []);

  useEffect(() => {
    dispatch(operations.fetchParties(buildQuery(1)));
  }, [filterTab]);

  const getPagination = () => (
    <Pagination
      className="d-flex justify-content-end text-end"
      aria-label="Page navigation example"
      size="sm"
    >
      <PaginationItem>
        <PaginationLink
          first
          onClick={() => dispatch(operations.fetchParties(buildQuery(1)))}
        />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink
          onClick={() =>
            dispatch(
              operations.fetchParties(buildQuery(paginationDetails.prevPage)),
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
                dispatch(operations.fetchParties(buildQuery(pageNumber)))
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
              operations.fetchParties(buildQuery(paginationDetails.nextPage)),
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
              operations.fetchParties(buildQuery(paginationDetails.totalPages)),
            )
          }
        />
      </PaginationItem>
    </Pagination>
  );

  const onDelete = (id, name) => {
    AlertPopupHandler.open({
      onConfirm: () =>
        dispatch(operations.onDelete(id, buildQuery(paginationDetails.page))),
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
      <Row>
        <Col>
          <div className="ml-2">
            {PARTY_FILTERS.map(({ _id, name }) => (
              <Button
                className="ms-1"
                size="sm"
                color={
                  filterTab === _id || filterTab === ''
                    ? 'primary'
                    : 'outline-primary'
                }
                onClick={() => setFilterTab(_id)}
              >
                {name}
              </Button>
            ))}
          </div>
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
                onClick={() => history.push(`/party/view?id=${_id}`)}
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
            formatter: (cell, { _id, name }) => (
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
                <Button
                  title="Delete Party"
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
    </div>
  );
}

export default PartyManagement;
