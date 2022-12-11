import { get } from 'lodash';

export const getCurrency = cookie => get(cookie, 'user.currency', '20');

export const isLoading = state => get(state, 'productDetails.isLoading', true);
export const productDetails = state =>
  get(state, 'productDetails.productDetails', {});
export const productHistory = state =>
  get(state, 'productDetails.productHistory', []);
export const paginationDetails = state =>
  get(state, 'productDetails.paginationDetails', {});
