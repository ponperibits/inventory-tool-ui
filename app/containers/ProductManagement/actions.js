/*
 *
 * ProductManagement actions
 *
 */

import NotificationHandler from 'components/Notifications/NotificationHandler';
import { get } from 'lodash';
import { paginateProducts, deleteProduct } from 'api/product';
import { SET_PRODUCT_LIST } from './constants';

export const fetchProducts = params => async dispatch => {
  try {
    const { data } = await paginateProducts(params);
    dispatch(setProductList(data));
  } catch (err) {
    dispatch(setProductList());
  }
};

export const onDelete = (id, params) => async dispatch => {
  try {
    await deleteProduct(id);
    dispatch(fetchProducts(params));
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

const setProductList = (payload = []) => ({
  type: SET_PRODUCT_LIST,
  payload,
});
