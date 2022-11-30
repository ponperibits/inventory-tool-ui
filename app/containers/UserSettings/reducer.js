/*
 *
 * UserSettings reducer
 *
 */
import produce from 'immer';
import {
  INIT,
  CHANGE_CURRENCY,
  CHANGE_PROFIT_PERCENT,
  SET_USER_DETAILS,
  SHOW_LOADING,
  VALIDATION_ERROR,
} from './constants';

export const initialState = {
  currency: '',
  profitPercent: '',
  isLoading: true,
  validationError: null,
};

/* eslint-disable default-case, no-param-reassign */
const userSettingsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INIT:
        return initialState;
      case CHANGE_CURRENCY:
        draft.currency = action.payload;
        break;
      case CHANGE_PROFIT_PERCENT:
        draft.profitPercent = action.payload;
        break;
      case SET_USER_DETAILS:
        draft.currency = action.payload.currency;
        draft.profitPercent = action.payload.profitPercent;
        draft.isLoading = false;
        break;
      case SHOW_LOADING:
        draft.isLoading = action.payload;
        break;
      case VALIDATION_ERROR:
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
        break;
    }
  });

export default userSettingsReducer;
