/**
 *
 * Dashboard
 *
 */

import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { get } from 'lodash';
import history from 'utils/history';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';

export default function Dashboard() {
  useInjectReducer({ key: 'dashboard', reducer });
  const dispatch = useDispatch();
  const [cookie] = useCookies(['user']);

  const dashboardStats = useSelector(selectors.dashboardStats);

  const getStat = (stat, defaultValue = 0) =>
    get(dashboardStats, stat) || defaultValue;

  useEffect(() => {
    dispatch(operations.fetchDashboardStats());
  }, []);
  return (
    <div className="dashboard mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <Row className="mt-3 text-primary">
        <h1 className="ml-2">Welcome {selectors.userName(cookie)}!</h1>
      </Row>
      <Row>
        <Col>
          <p className="text-primary fw-bold mb-1">
            Quick Stats{' '}
            <span className="text-sm text-muted">(Total Count)</span>
          </p>
          <Row className="d-flex flex-wrap">
            <Col
              className="col-xl-3 col-sm-3 mb-xl-0  hover-pointer"
              onClick={() => history.push('/party')}
              sm="4"
            >
              <Card className="w-100">
                <CardBody className="p-3">
                  <Row>
                    <Col xs="8">
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        Suppliers
                      </p>
                      <h3 className="font-weight-bold text-primary">
                        {getStat('noOfSuppliers')}
                      </h3>
                    </Col>
                    <Col xs="4" className="text-end">
                      <div className="icon icon-shape bg-gradient-danger shadow-primary text-center text-secondary rounded-circle">
                        <i
                          className="far fa-building text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col
              className="col-xl-3 col-sm-3 mb-xl-0  hover-pointer"
              onClick={() => history.push('/party')}
              sm="3"
            >
              <Card className="w-100">
                <CardBody className="p-3">
                  <Row>
                    <Col xs="8">
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        Customers
                      </p>
                      <h3 className="font-weight-bold text-primary">
                        {getStat('noOfCustomers')}
                      </h3>
                    </Col>
                    <Col xs="4" className="text-end">
                      <div className="icon icon-shape bg-gradient-danger shadow-primary text-center text-secondary rounded-circle">
                        <i
                          className="far fa-building text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col
              className="col-xl-3 col-sm-3 mb-xl-0  hover-pointer"
              onClick={() => history.push('/product')}
              sm="3"
            >
              <Card className="w-100">
                <CardBody className="p-3">
                  <Row>
                    <Col xs="8">
                      <p className="text-sm mb-0 text-uppercase font-weight-bold">
                        Products
                      </p>
                      <h3 className="font-weight-bold text-primary">
                        {getStat('noOfProducts')}
                      </h3>
                    </Col>
                    <Col xs="4" className="text-end">
                      <div className="icon icon-shape bg-gradient-danger shadow-primary text-center text-secondary rounded-circle">
                        <i
                          className="far fa-building text-lg opacity-10"
                          aria-hidden="true"
                        />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
