/*
 *
 * ProductManagement reducer
 *
 */
import produce from 'immer';
import { SET_PRODUCT_LIST } from './constants';

export const initialState = {
  products: [],
  paginationDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const productManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PRODUCT_LIST: {
        const {
          docs,
          hasNextPage,
          hasPrevPage,
          page,
          nextPage,
          prevPage,
          totalPages,
        } = action.payload;
        draft.products = docs;
        draft.paginationDetails = {
          hasNextPage,
          hasPrevPage,
          page,
          nextPage,
          prevPage,
          totalPages,
          pageNumbers: Array.from(
            { length: totalPages },
            (_, index) => index + 1,
          ),
        };
        break;
      }
      default:
        break;
    }
  });

export default productManagementReducer;
