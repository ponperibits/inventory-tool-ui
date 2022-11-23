/**
 *
 * Dashboard
 *
 */

import React from 'react';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet';
import { Row } from 'reactstrap';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import * as selectors from './selectors';

export default function Dashboard() {
  useInjectReducer({ key: 'dashboard', reducer });
  const [cookie] = useCookies(['user']);

  return (
    <div className="dashboard mx-3 mx-md-4 ml-lg-7">
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Description of Dashboard" />
      </Helmet>
      <Row className="mt-3 text-primary">
        <h1 className="ml-2">Welcome {selectors.userName(cookie)}!</h1>
      </Row>
    </div>
  );
}
