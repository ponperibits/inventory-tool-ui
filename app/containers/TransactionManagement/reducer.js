/*
 *
 * TransactionManagement reducer
 *
 */
import produce from 'immer';
import { SET_TRANSACTION_LIST } from './constants';

export const initialState = {
  transactions: [],
  paginationDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const transactionManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_TRANSACTION_LIST: {
        const {
          docs,
          hasNextPage,
          hasPrevPage,
          page,
          nextPage,
          prevPage,
          totalPages,
        } = action.payload;
        draft.transactions = docs;
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

export default transactionManagementReducer;
