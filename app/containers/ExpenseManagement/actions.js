/*
 *
 * ExpenseManagement actions
 *
 */

import NotificationHandler from 'components/Notifications/NotificationHandler';
import { get } from 'lodash';
import { paginateExpenses, deleteExpense } from 'api/expense';
import { SET_EXPENSE_LIST } from './constants';

export const fetchExpenses = params => async dispatch => {
  try {
    const { data } = await paginateExpenses(params);
    dispatch(setExpenseList(data));
  } catch (err) {
    dispatch(setExpenseList());
  }
};

export const onDelete = (id, params) => async dispatch => {
  try {
    await deleteExpense(id);
    dispatch(fetchExpenses(params));
    NotificationHandler.open({
      operation: 'success',
      title: 'Expense deleted successfully',
    });
  } catch (err) {
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to delete Expense',
    });
  }
};

const setExpenseList = (payload = []) => ({
  type: SET_EXPENSE_LIST,
  payload,
});
