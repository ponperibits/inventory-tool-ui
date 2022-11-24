/*
 *
 * PartyForm reducer
 *
 */
import produce from 'immer';
import { SUPPLIER } from 'utils/appConstants';
import {
  INIT,
  CHANGE_NAME,
  CHANGE_PHONE,
  CHANGE_TYPE,
  CHANGE_GST,
  CHANGE_PAN,
  CHANGE_CATEGORY,
  CHANGE_ADDRESS,
  SET_PARTY_DETAILS,
  SHOW_LOADING,
  VALIDATION_ERROR,
} from './constants';

export const initialState = {
  name: '',
  phone: '',
  type: SUPPLIER,
  gstNumber: '',
  panNumber: '',
  category: '',
  address: '',
  isEdit: false,
  isLoading: false,
  errorMessage: null,
  validationError: null,
};

/* eslint-disable default-case, no-param-reassign */
const partyFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INIT:
        return initialState;
      case CHANGE_NAME:
        draft.name = action.payload;
        break;
      case CHANGE_PHONE:
        draft.phone = action.payload;
        break;
      case CHANGE_TYPE:
        draft.type = action.payload;
        break;
      case CHANGE_GST:
        draft.gstNumber = action.payload;
        break;
      case CHANGE_PAN:
        draft.panNumber = action.payload;
        break;
      case CHANGE_CATEGORY:
        draft.category = action.payload;
        break;
      case CHANGE_ADDRESS:
        draft.address = action.payload;
        break;
      case SET_PARTY_DETAILS:
        draft.name = action.payload.name;
        draft.phone = action.payload.phone;
        draft.type = action.payload.type;
        draft.gstNumber = action.payload.gstNumber;
        draft.panNumber = action.payload.panNumber;
        draft.category = action.payload.category;
        draft.address = action.payload.address;
        draft.isEdit = true;
        break;
      case SHOW_LOADING:
        draft.isLoading = action.payload;
        draft.validationError = null;
        break;
      case VALIDATION_ERROR:
        draft.errorMessage = null;
        draft.validationError = {
          path: action.payload.path,
          message: action.payload.message,
        };
        break;
      default:
        break;
    }
  });

export default partyFormReducer;
