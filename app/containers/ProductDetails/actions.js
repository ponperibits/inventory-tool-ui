/*
 *
 * ProductDetails actions
 *
 */

import NotificationHandler from 'components/Notifications/NotificationHandler';
import { get } from 'lodash';
import { getProduct, deleteProduct } from 'api/product';
import { paginateRecords } from 'api/record';
import history from 'utils/history';
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

// eslint-disable-next-line no-unused-vars
export const onDelete = id => async dispatch => {
  try {
    await deleteProduct(id);
    history.push('/product');
    NotificationHandler.open({
      operation: 'success',
      title: 'Product deleted successfully',
    });
  } catch (err) {
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to delete Product',
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
