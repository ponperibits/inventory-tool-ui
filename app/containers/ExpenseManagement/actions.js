/*
 *
 * ExpenseManagement actions
 *
 */

import { paginateExpenses } from 'api/expense';
import { SET_EXPENSE_LIST } from './constants';

export const fetchExpenses = params => async dispatch => {
  try {
    const { data } = await paginateExpenses(params);
    dispatch(setExpenseList(data));
  } catch (err) {
    dispatch(setExpenseList());
  }
};

const setExpenseList = (payload = []) => ({
  type: SET_EXPENSE_LIST,
  payload,
});
