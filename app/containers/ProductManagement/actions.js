/*
 *
 * ProductManagement actions
 *
 */

import { paginateProducts } from 'api/product';
import { SET_PRODUCT_LIST } from './constants';

export const fetchProducts = params => async dispatch => {
  try {
    const { data } = await paginateProducts(params);
    dispatch(setProductList(data));
  } catch (err) {
    dispatch(setProductList());
  }
};

const setProductList = (payload = []) => ({
  type: SET_PRODUCT_LIST,
  payload,
});
