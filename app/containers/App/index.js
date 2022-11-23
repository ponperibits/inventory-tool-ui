/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import ProtectedRoute from '../ProtectedPage';
import AuthLayout from '../../layouts/Auth';
import HomeLayout from '../../layouts/Home';
import Logout from '../Logout';

import GlobalStyle from '../../global-styles';

export default function App() {
  return (
    <div className="app w-100 h-100">
      <Helmet titleTemplate="%s - Inventory Tool" defaultTitle="Inventory Tool">
        <meta name="description" content="Inventory Tool application" />
      </Helmet>

      <Switch>
        <Route path="/auth" render={props => <AuthLayout {...props} />} />
        <Route exact path="/logout" render={props => <Logout {...props} />} />
        <ProtectedRoute path="/" component={HomeLayout} />
        <Redirect from="*" to="/" />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
