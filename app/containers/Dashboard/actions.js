/*
 *
 * Dashboard actions
 *
 */

import { getDashboardStats } from 'api/commonDetail';
import { SET_DASHBOARD_STATS } from './constants';

export const fetchDashboardStats = () => async dispatch => {
  try {
    const { data } = await getDashboardStats();
    dispatch(setDashboardStats(data));
    // eslint-disable-next-line no-empty
  } catch (err) {}
};

const setDashboardStats = (payload = {}) => ({
  type: SET_DASHBOARD_STATS,
  payload,
});
