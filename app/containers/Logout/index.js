/**
 *
 * Logout
 *
 */

import React from 'react';
import { useDispatch } from 'react-redux';
import Loader from 'components/Loaders';
import * as operations from './actions';
export default function Logout() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(operations.onLogout());
  }, []);

  return <Loader />;
}
