/*
 *
 * ReportManagement reducer
 *
 */
import produce from 'immer';
import {
  INIT,
  CHANGE_REPORT_TYPE,
  CHANGE_ENTITY,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  SET_REPORT_LIST,
} from './constants';

export const initialState = {
  reportType: 'Product',
  selectedEntity: '',
  startDate: '',
  endDate: '',
  reportList: [],
};

/* eslint-disable default-case, no-param-reassign */
const reportManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INIT:
        return initialState;
      case CHANGE_REPORT_TYPE:
        draft.reportType = action.payload;
        break;
      case CHANGE_ENTITY:
        draft.selectedEntity = action.payload;
        break;
      case CHANGE_START_DATE:
        draft.startDate = action.payload;
        break;
      case CHANGE_END_DATE:
        draft.endDate = action.payload;
        break;
      case SET_REPORT_LIST:
        draft.reportList = action.payload;
        break;
      default:
        break;
    }
  });

export default reportManagementReducer;
