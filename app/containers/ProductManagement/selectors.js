import { get } from 'lodash';

export const getCurrency = cookie => get(cookie, 'user.currency', '');

export const products = state => get(state, 'productManagement.products', []);
export const paginationDetails = state =>
  get(state, 'productManagement.paginationDetails', []);
