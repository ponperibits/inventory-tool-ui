/*
 *
 * PartyManagement reducer
 *
 */
import produce from 'immer';
import { SET_PARTY_LIST } from './constants';

export const initialState = {
  parties: [],
  paginationDetails: {},
};

/* eslint-disable default-case, no-param-reassign */
const partyManagementReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_PARTY_LIST: {
        const {
          docs,
          hasNextPage,
          hasPrevPage,
          page,
          nextPage,
          prevPage,
          totalPages,
        } = action.payload;
        draft.parties = docs;
        draft.paginationDetails = {
          hasNextPage,
          hasPrevPage,
          page,
          nextPage,
          prevPage,
          totalPages,
          pageNumbers: Array.from(
            { length: totalPages },
            (_, index) => index + 1,
          ),
        };
        break;
      }
      default:
        break;
    }
  });

export default partyManagementReducer;
