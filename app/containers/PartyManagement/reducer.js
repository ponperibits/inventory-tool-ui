/*
 *
 * PartyManagement reducer
 *
 */
import produce from 'immer';
import { SET_PARTY_LIST } from './constants';

export const initialState = {
  parties: [],
};

/* eslint-disable default-case, no-param-reassign */
const partyManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PARTY_LIST:
        draft.parties = action.payload;
        break;
      default:
        break;
    }
  });

export default partyManagementReducer;
