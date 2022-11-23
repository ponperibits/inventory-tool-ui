import { get } from 'lodash';

export const fullname = state => get(state, 'registerPage.name', '');
export const email = state => get(state, 'registerPage.email', '');
export const password = state => get(state, 'registerPage.password', '');
export const orgName = state => get(state, 'registerPage.orgName', '');

export const isLoading = state => get(state, 'registerPage.isLoading', false);

export const errorMessage = state =>
  get(state, 'registerPage.errorMessage', null);

export const validations = state =>
  get(state, 'registerPage.validationError', null);

export const showEmailVerification = state =>
  get(state, 'registerPage.showEmailVerification', false);

export const emailCode = state => get(state, 'registerPage.emailCode', '');

export const disableResendCode = state =>
  get(state, 'registerPage.disableResendCode', false);
