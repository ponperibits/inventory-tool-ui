import { get } from 'lodash';

export const getProfitPercent = cookie =>
  get(cookie, 'user.profitPercent', 20) / 100;

export const name = state => get(state, 'productForm.name', '');
export const description = state => get(state, 'productForm.description', '');
export const price = state => get(state, 'productForm.price', '');
export const sellingPrice = state => get(state, 'productForm.sellingPrice', '');
export const minStockWarning = state =>
  get(state, 'productForm.minStockWarning', '');

export const isEdit = state => get(state, 'productForm.isEdit', false);

export const isLoading = state => get(state, 'productForm.isLoading', false);
export const errorMessage = state =>
  get(state, 'productForm.errorMessage', null);
export const validations = state =>
  get(state, 'productForm.validationError', {});
