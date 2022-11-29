/*
 *
 * ExpenseForm actions
 *
 */

import history from 'utils/history';
import { get } from 'lodash';
import { addExpense, editExpense, getExpense } from 'api/expense';
import NotificationHandler from 'components/Notifications/NotificationHandler';
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
import schema from './validations';

export const onSubmit = expenseDetails => async dispatch => {
  try {
    const isValid = schema.isValidSync(expenseDetails);
    if (!isValid) {
      const err = await schema.validate(expenseDetails).catch(error => error);
      dispatch(validationFailed(err));
      return;
    }
    dispatch(showLoading(true));

    await addExpense(expenseDetails);
    NotificationHandler.open({
      operation: 'success',
      title: 'Expense added successfully',
    });

    history.push('/expense');
  } catch (err) {
    dispatch(showLoading(false));
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to add Expense',
    });
  }
};

export const onEdit = (id, expenseDetails) => async dispatch => {
  try {
    const isValid = schema.isValidSync(expenseDetails);
    if (!isValid) {
      const err = await schema.validate(expenseDetails).catch(error => error);
      dispatch(validationFailed(err));
      return;
    }
    dispatch(showLoading(true));

    await editExpense(id, expenseDetails);
    NotificationHandler.open({
      operation: 'success',
      title: 'Expense edited successfully',
    });
    history.push('/expense');
  } catch (err) {
    dispatch(showLoading(false));
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to edit Expense',
    });
  }
};

export const fetchDetails = id => async dispatch => {
  try {
    const { data } = await getExpense(id);
    dispatch(setExpenseDetails(data));
  } catch (err) {
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to fetch Expense details',
    });
  }
};

const setExpenseDetails = payload => ({
  type: SET_EXPENSE_DETAILS,
  payload,
});

const validationFailed = payload => ({
  type: VALIDATION_ERROR,
  payload,
});

const showLoading = payload => ({
  type: SHOW_LOADING,
  payload,
});

export const expenseFormInit = dispatch => () => {
  dispatch({
    type: INIT,
  });
};

export const changeDate = payload => ({
  type: CHANGE_DATE,
  payload,
});

export const changeTitle = payload => ({
  type: CHANGE_TITLE,
  payload,
});

export const changeAmount = payload => ({
  type: CHANGE_AMOUNT,
  payload,
});

export const changeType = payload => ({
  type: CHANGE_TYPE,
  payload,
});

export const changeNotes = payload => ({
  type: CHANGE_NOTES,
  payload,
});
