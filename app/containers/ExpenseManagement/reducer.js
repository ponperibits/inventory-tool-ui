/*
 *
 * ExpenseManagement reducer
 *
 */
import produce from 'immer';
import { SET_EXPENSE_LIST } from './constants';

export const initialState = {
  expenses: [],
  paginationDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const expenseManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_EXPENSE_LIST: {
        const {
          docs,
          hasNextPage,
          hasPrevPage,
          page,
          nextPage,
          prevPage,
          totalPages,
        } = action.payload;
        draft.expenses = docs;
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

export default expenseManagementReducer;
