/*
 *
 * TransactionForm actions
 *
 */

import history from 'utils/history';
import { get } from 'lodash';
import {
  addTransaction,
  editTransaction,
  getTransaction,
} from 'api/transaction';
import NotificationHandler from 'components/Notifications/NotificationHandler';
import {
  INIT,
  CHANGE_DATE,
  CHANGE_PARTY,
  CHANGE_NOTES,
  ADD_RECORD,
  CHANGE_RECORD,
  SET_TRANSACTION_DETAILS,
  SHOW_LOADING,
} from './constants';

export const onSubmit = transactionDetails => async dispatch => {
  try {
    dispatch(showLoading(true));

    await addTransaction({
      ...transactionDetails,
      amount: get(transactionDetails, 'records', []).reduce(
        (acc, { amount }) => acc + amount,
        0,
      ),
      transactionDate: transactionDetails.transactionDate.valueOf(),
    });
    NotificationHandler.open({
      operation: 'success',
      title: 'Transaction added successfully',
    });
    history.push('/transaction');
  } catch (err) {
    dispatch(showLoading(false));
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to add Transaction',
    });
  }
};

export const onEdit = (id, transactionDetails) => async dispatch => {
  try {
    dispatch(showLoading(true));

    await editTransaction(id, {
      ...transactionDetails,
      amount: get(transactionDetails, 'records', []).reduce(
        (acc, { amount }) => acc + amount,
        0,
      ),
      transactionDate: transactionDetails.transactionDate.valueOf(),
    });
    NotificationHandler.open({
      operation: 'success',
      title: 'Transaction edited successfully',
    });
    history.push('/transaction');
  } catch (err) {
    dispatch(showLoading(false));
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to edit Transaction',
    });
  }
};

export const fetchDetails = id => async dispatch => {
  try {
    const { data } = await getTransaction(id);
    dispatch(setTransactionDetails(data));
  } catch (err) {
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to fetch transaction details',
    });
  }
};

const setTransactionDetails = payload => ({
  type: SET_TRANSACTION_DETAILS,
  payload,
});

const showLoading = payload => ({
  type: SHOW_LOADING,
  payload,
});

export const transactionFormInit = dispatch => () => {
  dispatch({ type: INIT });
};

export const changeDate = payload => ({
  type: CHANGE_DATE,
  payload,
});

export const changeParty = payload => ({
  type: CHANGE_PARTY,
  payload,
});

export const changeNotes = payload => ({
  type: CHANGE_NOTES,
  payload,
});

export const addRecord = () => ({
  type: ADD_RECORD,
});

export const changeRecord = payload => ({
  type: CHANGE_RECORD,
  payload,
});
