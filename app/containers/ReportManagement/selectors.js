import { get } from 'lodash';

export const getCurrency = cookie => get(cookie, 'user.currency', '');

export const reportList = state =>
  get(state, 'reportManagement.reportList', []);

export const reportType = state =>
  get(state, 'reportManagement.reportType', 'Product');
export const selectedEntity = state =>
  get(state, 'reportManagement.selectedEntity', '');
export const startDate = state => get(state, 'reportManagement.startDate', '');
export const endDate = state => get(state, 'reportManagement.endDate', '');
