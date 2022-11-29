import { get } from 'lodash';

export const expenses = state => get(state, 'expenseManagement.expenses', []);
export const paginationDetails = state =>
  get(state, 'expenseManagement.paginationDetails', []);
