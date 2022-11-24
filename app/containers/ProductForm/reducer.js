/*
 *
 * ProductForm reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import {
  INIT,
  CHANGE_NAME,
  CHANGE_DESCRIPTION,
  CHANGE_PRICE,
  CHANGE_SELLING_PRICE,
  CHANGE_CURRENCY,
  CHANGE_NO_OF_UNITS,
  CHANGE_SUPPLIER,
  SET_PRODUCT_DETAILS,
  SHOW_LOADING,
  VALIDATION_ERROR,
  SET_AVAILABLE_SUPPLIERS,
} from './constants';

export const initialState = {
  name: '',
  description: '',
  price: '',
  sellingPrice: '',
  currency: '',
  noOfUnits: '',
  supplierId: '',
  availableSuppliers: [],
  isEdit: false,
  isLoading: false,
  errorMessage: null,
  validationError: null,
};

/* eslint-disable default-case, no-param-reassign */
const productFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INIT:
        return initialState;
      case CHANGE_NAME:
        draft.name = action.payload;
        break;
      case CHANGE_DESCRIPTION:
        draft.description = action.payload;
        break;
      case CHANGE_PRICE:
        draft.price = action.payload;
        break;
      case CHANGE_SELLING_PRICE:
        draft.sellingPrice = action.payload;
        break;
      case CHANGE_CURRENCY:
        draft.currency = action.payload;
        break;
      case CHANGE_NO_OF_UNITS:
        draft.noOfUnits = action.payload;
        break;
      case CHANGE_SUPPLIER:
        draft.supplierId = action.payload;
        break;
      case SET_PRODUCT_DETAILS:
        draft.name = action.payload.name;
        draft.description = action.payload.description;
        draft.price = action.payload.price;
        draft.sellingPrice = action.payload.sellingPrice;
        draft.currency = action.payload.currency;
        draft.noOfUnits = action.payload.noOfUnits;
        draft.supplierId = get(action, 'payload.supplierId._id', '');
        draft.isEdit = true;
        break;
      case SET_AVAILABLE_SUPPLIERS:
        draft.availableSuppliers = action.payload;
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

export default productFormReducer;
