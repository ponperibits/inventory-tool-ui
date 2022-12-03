/*
 *
 * PartyManagement actions
 *
 */

import NotificationHandler from 'components/Notifications/NotificationHandler';
import { get } from 'lodash';
import { paginateParties, deleteParty } from 'api/party';
import { SET_PARTY_LIST } from './constants';

export const fetchParties = params => async dispatch => {
  try {
    const { data } = await paginateParties(params);
    dispatch(setPartyList(data));
  } catch (err) {
    dispatch(setPartyList());
  }
};

export const onDelete = (id, params) => async dispatch => {
  try {
    await deleteParty(id);
    dispatch(fetchParties(params));
    NotificationHandler.open({
      operation: 'success',
      title: 'Party deleted successfully',
    });
  } catch (err) {
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to delete Party',
    });
  }
};

const setPartyList = (payload = []) => ({
  type: SET_PARTY_LIST,
  payload,
});
