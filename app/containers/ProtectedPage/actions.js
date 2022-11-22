import { authenticateUser } from 'api/auth';
import { AUTHENTICATE_USER, AUTH_PAGE_INIT } from './constants';

export const isValidUser = () => async dispatch => {
  const { data } = await authenticateUser();
  dispatch(validateUser(data));
};

const validateUser = payload => ({
  type: AUTHENTICATE_USER,
  payload,
});

export const authInit = dispatch => () => {
  dispatch({
    type: AUTH_PAGE_INIT,
  });
};
