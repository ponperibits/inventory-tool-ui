import { get } from 'lodash';

export const getCurrency = cookie => get(cookie, 'user.currency', '');

export const transactions = state =>
  get(state, 'transactionManagement.transactions', []);
export const paginationDetails = state =>
  get(state, 'transactionManagement.paginationDetails', []);
