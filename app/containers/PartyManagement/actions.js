/*
 *
 * Clients actions
 *
 */

import { getParties } from 'api/party';
import { SET_PARTY_LIST } from './constants';

export const fetchParties = () => async dispatch => {
  try {
    const { data } = await getParties();
    dispatch(setPartyList(data));
  } catch (err) {
    dispatch(setPartyList());
  }
};

// const setLoading = payload => ({
//   type: CLIENT_PAGE_SET_LOADING,
//   payload,
// });

const setPartyList = (payload = []) => ({
  type: SET_PARTY_LIST,
  payload,
});
