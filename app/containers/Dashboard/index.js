/**
 *
 * Dashboard
 *
 */

import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Row, Col } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import { get } from 'lodash';
import reducer from './reducer';
import * as operations from './actions';
import * as selectors from './selectors';
import CountCard from './CountCard';

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
            <CountCard
              title="Suppliers"
              route="party"
              count={getStat('noOfSuppliers')}
            />
            <CountCard
              title="Customers"
              route="party"
              count={getStat('noOfCustomers')}
            />
            <CountCard
              title="Products"
              route="product"
              count={getStat('noOfProducts')}
            />
            <CountCard
              title="No. of Low Stock Products"
              route="product"
              count={getStat('noOfLowStockProducts')}
            />
            <CountCard
              title="Purchase So Far"
              route="transaction"
              count={getStat('totalPurchase')}
            />
            <CountCard
              title="Sales So Far"
              route="transaction"
              count={getStat('totalSale')}
            />
            <CountCard
              title="Total Other Income"
              route="expense"
              count={getStat('totalOtherIncome')}
            />
            <CountCard
              title="Total Other Expense"
              route="expense"
              count={getStat('totalOtherExpense')}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
}
