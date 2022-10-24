import { get } from 'lodash';

export const userName = cookie => get(cookie, 'user.name', '');

export const dashboardStats = state =>
  get(state, 'dashboard.dashboardStats', {
    noOfSuppliers: 0,
    noOfCustomers: 0,
    noOfProducts: 0,
  });
