/*
 *
 * Dashboard reducer
 *
 */
import produce from 'immer';
import { SET_DASHBOARD_STATS } from './constants';

export const initialState = {
  dashboardStats: {
    noOfSuppliers: 0,
    noOfCustomers: 0,
    noOfProducts: 0,
  },
};

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_DASHBOARD_STATS:
        draft.dashboardStats = action.payload;
        break;
    }
  });

export default dashboardReducer;
