/*
 *
 * TransactionForm reducer
 *
 */
import produce from 'immer';
import {
  INIT,
  CHANGE_DATE,
  CHANGE_PARTY,
  CHANGE_NOTES,
  ADD_RECORD,
  CHANGE_RECORD,
  SET_TRANSACTION_DETAILS,
  SHOW_LOADING,
} from './constants';
import { shapeRecords } from './helpers';

export const initialState = {
  transactionDate: '',
  notes: '',
  partyId: '',
  records: [{ productId: '', noOfUnits: '', prodUnitsBalance: 0, amount: 0 }],
  isLoading: false,
  isEdit: false,
};

/* eslint-disable default-case, no-param-reassign */
const transactionFormReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INIT:
        return initialState;
      case CHANGE_DATE:
        draft.transactionDate = action.payload;
        break;
      case CHANGE_PARTY:
        draft.partyId = action.payload;
        break;
      case CHANGE_NOTES:
        draft.notes = action.payload;
        break;
      case ADD_RECORD:
        draft.records = [
          ...draft.records,
          { productId: '', noOfUnits: '', prodUnitsBalance: 0, amount: 0 },
        ];
        break;
      case CHANGE_RECORD: {
        const { index, payload } = action.payload;
        draft.records[index] = payload;
        break;
      }
      case SET_TRANSACTION_DETAILS:
        draft.transactionDate = action.payload.transactionDate;
        draft.currency = action.payload.currency;
        draft.notes = action.payload.notes;
        draft.partyId = action.payload.supplierId || action.payload.customerId;
        draft.records = shapeRecords(action.payload.records);
        draft.isEdit = true;
        break;
      case SHOW_LOADING:
        draft.isLoading = action.payload;
        break;
    }
  });

export default transactionFormReducer;
