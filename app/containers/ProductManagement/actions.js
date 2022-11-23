/*
 *
 * ProductManagement actions
 *
 */

import { getProducts } from 'api/product';
import { SET_PRODUCT_LIST } from './constants';

export const fetchProducts = () => async dispatch => {
  try {
    const { data } = await getProducts();
    dispatch(setProductList(data));
  } catch (err) {
    dispatch(setProductList());
  }
};

const setProductList = (payload = []) => ({
  type: SET_PRODUCT_LIST,
  payload,
});
