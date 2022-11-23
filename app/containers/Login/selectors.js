import { get } from 'lodash';

export const email = state => get(state, 'loginPage.email', '');

export const password = state => get(state, 'loginPage.password', '');

export const isLoading = state => get(state, 'loginPage.isLoading', false);

export const errorMessage = state => get(state, 'loginPage.errorMessage', null);

export const validations = state =>
  get(state, 'loginPage.validationError', null);
