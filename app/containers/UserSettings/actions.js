/*
 *
 * UserSettings actions
 *
 */

import { get } from 'lodash';
import { getUser, editUser } from 'api/user';
import NotificationHandler from 'components/Notifications/NotificationHandler';
import {
  INIT,
  CHANGE_CURRENCY,
  CHANGE_PROFIT_PERCENT,
  SET_USER_DETAILS,
  SHOW_LOADING,
  VALIDATION_ERROR,
} from './constants';
import schema from './validations';

export const onEdit = userDetails => async dispatch => {
  try {
    const isValid = schema.isValidSync(userDetails);
    if (!isValid) {
      const err = await schema.validate(userDetails).catch(error => error);
      dispatch(validationFailed(err));
      return;
    }
    dispatch(showLoading(true));

    await editUser(userDetails);
    NotificationHandler.open({
      operation: 'success',
      title: 'Settings saved! Please logout and login again to see changes.',
    });

    dispatch(validationFailed({}));
    dispatch(showLoading(false));
  } catch (err) {
    dispatch(showLoading(false));
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to save Settings',
    });
  }
};

export const fetchDetails = () => async dispatch => {
  try {
    const { data } = await getUser();
    dispatch(setUserDetails(data));
  } catch (err) {
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to fetch user settings',
    });
  }
};

const setUserDetails = payload => ({
  type: SET_USER_DETAILS,
  payload,
});

const validationFailed = payload => ({
  type: VALIDATION_ERROR,
  payload,
});

const showLoading = payload => ({
  type: SHOW_LOADING,
  payload,
});

export const userSettingsInit = dispatch => () => {
  dispatch({
    type: INIT,
  });
};

export const changeCurrency = payload => ({
  type: CHANGE_CURRENCY,
  payload,
});

export const changeProfitPercent = payload => ({
  type: CHANGE_PROFIT_PERCENT,
  payload,
});
