/*
 *
 * ProductManagement reducer
 *
 */
import produce from 'immer';
import { SET_PRODUCT_LIST } from './constants';

export const initialState = {
  products: [],
};

/* eslint-disable default-case, no-param-reassign */
const productManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PRODUCT_LIST:
        draft.products = action.payload;
        break;
      default:
        break;
    }
  });

export default productManagementReducer;
