/*
 *
 * PartyDetails reducer
 *
 */
import produce from 'immer';
import { INIT, SET_PARTY_DETAILS, SET_PARTY_HISTORY } from './constants';

export const initialState = {
  isLoading: true,
  partyDetails: {},
  partyHistory: [],
  paginationDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const partyDetailsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case INIT:
        return initialState;
      case SET_PARTY_DETAILS:
        draft.partyDetails = action.payload;
        draft.isLoading = false;
        break;
      case SET_PARTY_HISTORY: {
        const { docs, hasNextPage, nextPage } = action.payload;
        draft.partyHistory = [...draft.partyHistory, ...docs];
        draft.paginationDetails = {
          hasNextPage,
          nextPage,
        };
        break;
      }
      default:
        break;
    }
  });

export default partyDetailsReducer;
