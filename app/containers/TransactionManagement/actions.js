/*
 *
 * TransactionManagement actions
 *
 */

import NotificationHandler from 'components/Notifications/NotificationHandler';
import { get } from 'lodash';
import { getTransactions, deleteTransaction } from 'api/transaction';
import { SET_TRANSACTION_LIST } from './constants';

export const fetchTransactions = params => async dispatch => {
  try {
    const { data } = await getTransactions(params);
    dispatch(setTransactionList(data));
  } catch (err) {
    dispatch(setTransactionList());
  }
};

export const onDelete = (id, params) => async dispatch => {
  try {
    await deleteTransaction(id);
    dispatch(fetchTransactions(params));
    NotificationHandler.open({
      operation: 'success',
      title: 'Transaction deleted successfully',
    });
  } catch (err) {
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to delete Transaction',
    });
  }
};

const setTransactionList = (payload = []) => ({
  type: SET_TRANSACTION_LIST,
  payload,
});
