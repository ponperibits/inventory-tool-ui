/*
 *
 * ProductDetails actions
 *
 */

import NotificationHandler from 'components/Notifications/NotificationHandler';
import { get } from 'lodash';
import { getProduct } from 'api/product';
import { paginateRecords } from 'api/record';
import { INIT, SET_PRODUCT_DETAILS, SET_PRODUCT_HISTORY } from './constants';

export const fetchProductDetails = id => async dispatch => {
  try {
    const { data } = await getProduct(id);
    dispatch(setProductDetails(data));
  } catch (err) {
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to fetch product details',
    });
  }
};

export const fetchProductHistory = params => async dispatch => {
  try {
    const { data } = await paginateRecords(params);
    dispatch(setProductHistory(data));
  } catch (err) {
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to fetch product history',
    });
  }
};

const setProductDetails = payload => ({
  type: SET_PRODUCT_DETAILS,
  payload,
});

const setProductHistory = payload => ({
  type: SET_PRODUCT_HISTORY,
  payload,
});

export const productDetailsInit = dispatch => () => {
  dispatch({
    type: INIT,
  });
};
