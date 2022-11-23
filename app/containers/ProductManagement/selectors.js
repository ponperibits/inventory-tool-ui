import { get } from 'lodash';

export const products = state => get(state, 'productManagement.products', []);
