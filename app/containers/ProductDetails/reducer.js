/*
 *
 * ProductDetails reducer
 *
 */
import produce from 'immer';
import { INIT, SET_PRODUCT_DETAILS, SET_PRODUCT_HISTORY } from './constants';

export const initialState = {
  isLoading: true,
  productDetails: {},
  productHistory: [],
  paginationDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const productDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET_PRODUCT_DETAILS:
        draft.productDetails = action.payload;
        draft.isLoading = false;
        break;
      case SET_PRODUCT_HISTORY: {
        const { docs, hasNextPage, nextPage } = action.payload;
        draft.productHistory = [...draft.productHistory, ...docs];
        draft.paginationDetails = {
          hasNextPage,
          nextPage,
        };
        break;
      }
      default:
        break;
    }
  });

export default productDetailsReducer;
