/*
 *
 * PartyManagement actions
 *
 */

import { paginateParties } from 'api/party';
import { SET_PARTY_LIST } from './constants';

export const fetchParties = params => async dispatch => {
  try {
    const { data } = await paginateParties(params);
    dispatch(setPartyList(data));
  } catch (err) {
    dispatch(setPartyList());
  }
};

const setPartyList = (payload = []) => ({
  type: SET_PARTY_LIST,
  payload,
});
