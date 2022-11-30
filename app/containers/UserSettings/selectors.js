import { get } from 'lodash';

export const currency = state => get(state, 'userSettings.currency', '');
export const profitPercent = state =>
  get(state, 'userSettings.profitPercent', '');

export const isLoading = state => get(state, 'userSettings.isLoading', true);
export const validations = state =>
  get(state, 'userSettings.validationError', {});
