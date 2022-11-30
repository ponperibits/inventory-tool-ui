import { get } from 'lodash';

export const products = state => get(state, 'productManagement.products', []);
export const paginationDetails = state =>
  get(state, 'productManagement.paginationDetails', []);
