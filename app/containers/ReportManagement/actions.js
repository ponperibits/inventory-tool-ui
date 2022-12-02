/*
 *
 * ReportManagement actions
 *
 */

import { get } from 'lodash';
import { getRecords } from 'api/record';
import NotificationHandler from 'components/Notifications/NotificationHandler';
import {
  INIT,
  CHANGE_REPORT_TYPE,
  CHANGE_ENTITY,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  SET_REPORT_LIST,
} from './constants';

export const onSubmit = ({ startDate, endDate, ...rest }) => async dispatch => {
  try {
    const { data } = await getRecords({
      startDate: startDate.valueOf(),
      endDate: endDate.valueOf(),
      ...rest,
    });
    dispatch(setReportList(data));
  } catch (err) {
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to fetch Report',
    });
    dispatch(setReportList());
  }
};

export const setReportList = payload => ({
  type: SET_REPORT_LIST,
  payload,
});

export const reportInit = dispatch => () => {
  dispatch({
    type: INIT,
  });
};

export const changeReportType = payload => ({
  type: CHANGE_REPORT_TYPE,
  payload,
});

export const changeEntity = payload => ({
  type: CHANGE_ENTITY,
  payload,
});

export const changeStartDate = payload => ({
  type: CHANGE_START_DATE,
  payload,
});

export const changeEndDate = payload => ({
  type: CHANGE_END_DATE,
  payload,
});
