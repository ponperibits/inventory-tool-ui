import { get } from 'lodash';
import { EXPENSE } from 'utils/appConstants';

export const transactionDate = state =>
  get(state, 'expenseForm.transactionDate', '');
export const title = state => get(state, 'expenseForm.title', '');
export const amount = state => get(state, 'expenseForm.amount', '');
export const type = state => get(state, 'expenseForm.type', EXPENSE);
export const notes = state => get(state, 'expenseForm.notes', '');

export const isEdit = state => get(state, 'expenseForm.isEdit', false);

export const isLoading = state => get(state, 'expenseForm.isLoading', false);
export const errorMessage = state =>
  get(state, 'expenseForm.errorMessage', null);
export const validations = state =>
  get(state, 'expenseForm.validationError', {});
