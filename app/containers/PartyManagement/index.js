/**
 *
 * PartyManagement
 *
 */

import React, { useEffect } from 'react';
import { Row, Col, Button, Table, Badge } from 'reactstrap';
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

  useEffect(() => {
    dispatch(operations.fetchParties());
  }, []);

  const getPartiesData = () =>
    parties.map(({ _id, name, phone, type, gstNumber, address }) => (
      <React.Fragment key={_id}>
        <tr>
          <td
            className="hover-pointer text-primary"
            onClick={() => history.push(`/party/view?id=${_id}`)}
            aria-hidden="true"
          >
            {name}
          </td>
          <td>{phone}</td>
          <td>
            <Badge color={type === SUPPLIER ? 'danger' : 'success'}>
              {type}
            </Badge>
          </td>
          <td>{gstNumber || '-'}</td>
          <td>{address || '-'}</td>
          <td>
            <Button
              title="Edit Pary"
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
              title="View Pary"
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
          </td>
        </tr>
      </React.Fragment>
    ));

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

      <div className="table-responsive">
        <Table striped hover className="mt-3 align-items-center">
          <thead className="thead-light">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Type</th>
              <th scope="col">GST Number</th>
              <th scope="col">Address</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>{getPartiesData()}</tbody>
        </Table>
      </div>
    </div>
  );
}

export default PartyManagement;
