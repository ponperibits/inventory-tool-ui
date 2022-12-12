import { get } from 'lodash';

export const getCurrency = cookie => get(cookie, 'user.currency', '');

export const expenses = state => get(state, 'expenseManagement.expenses', []);
export const paginationDetails = state =>
  get(state, 'expenseManagement.paginationDetails', []);
