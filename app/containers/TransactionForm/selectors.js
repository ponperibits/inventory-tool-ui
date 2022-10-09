import { get } from 'lodash';

export const transactionDate = state =>
  get(state, 'transactionForm.transactionDate', '');
export const notes = state => get(state, 'transactionForm.notes', '');
export const partyId = state => get(state, 'transactionForm.partyId', '');
export const records = state => get(state, 'transactionForm.records', []);

export const isEdit = state => get(state, 'transactionForm.isEdit', false);
export const isLoading = state =>
  get(state, 'transactionForm.isLoading', false);
export const errorMessage = state =>
  get(state, 'transactionForm.errorMessage', null);
export const validations = state =>
  get(state, 'transactionForm.validationError', {});
