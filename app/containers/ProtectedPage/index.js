import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/Loaders';
import * as operations from './actions';
import * as selectors from './selectors';
import reducer from './reducer';

// eslint-disable-next-line react/prop-types
function AuthenticateRoute({ component: Component, ...rest }) {
  useInjectReducer({ key: 'authPage', reducer });
  const dispatch = useDispatch();
  const authPageInit = operations.authInit(dispatch);

  const { isLoading, isUser } = useSelector(state => ({
    isLoading: selectors.isLoading(state),
    isUser: selectors.isUser(state),
  }));

  useEffect(() => {
    if (!isUser) {
      dispatch(operations.isValidUser());
    }
    return () => authPageInit();
  }, []);

  const getComponent = props => {
    if (isLoading) return <Loader />;

    return isUser ? <Component {...props} /> : <Redirect to="/auth" />;
  };

  return <Route {...rest} render={props => getComponent(props)} />;
}

export default AuthenticateRoute;
