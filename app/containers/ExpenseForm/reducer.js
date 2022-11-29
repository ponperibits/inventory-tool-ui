/*
 *
 * ExpenseForm reducer
 *
 */
import produce from 'immer';
import { EXPENSE } from 'utils/appConstants';
import {
  INIT,
  CHANGE_DATE,
  CHANGE_TITLE,
  CHANGE_AMOUNT,
  CHANGE_TYPE,
  CHANGE_NOTES,
  SET_EXPENSE_DETAILS,
  SHOW_LOADING,
  VALIDATION_ERROR,
} from './constants';

export const initialState = {
  transactionDate: '',
  title: '',
  amount: '',
  type: EXPENSE,
  notes: '',
  isEdit: false,
  isLoading: false,
  errorMessage: null,
  validationError: null,
};

/* eslint-disable default-case, no-param-reassign */
const expenseFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INIT:
        return initialState;
      case CHANGE_DATE:
        draft.transactionDate = action.payload;
        break;
      case CHANGE_TITLE:
        draft.title = action.payload;
        break;
      case CHANGE_AMOUNT:
        draft.amount = action.payload;
        break;
      case CHANGE_TYPE:
        draft.type = action.payload;
        break;
      case CHANGE_NOTES:
        draft.notes = action.payload;
        break;
      case SET_EXPENSE_DETAILS:
        draft.transactionDate = action.payload.transactionDate;
        draft.title = action.payload.title;
        draft.amount = action.payload.amount;
        draft.type = action.payload.type;
        draft.notes = action.payload.notes;
        draft.isEdit = true;
        break;
      case SHOW_LOADING:
        draft.isLoading = action.payload;
        draft.validationError = null;
        break;
      case VALIDATION_ERROR:
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
        break;
      default:
        break;
    }
  });

export default expenseFormReducer;
