/*
 *
 * TransactionManagement actions
 *
 */

import { getTransactions } from 'api/transaction';
import { SET_TRANSACTION_LIST } from './constants';

export const fetchTransactions = params => async dispatch => {
  try {
    const { data } = await getTransactions(params);
    dispatch(setTransactionList(data));
  } catch (err) {
    dispatch(setTransactionList());
  }
};

const setTransactionList = (payload = []) => ({
  type: SET_TRANSACTION_LIST,
  payload,
});
