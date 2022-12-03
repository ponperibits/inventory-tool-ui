/*
 *
 * PartyDetails actions
 *
 */

import NotificationHandler from 'components/Notifications/NotificationHandler';
import { get } from 'lodash';
import { getParty, deleteParty } from 'api/party';
import { paginateRecords } from 'api/record';
import history from 'utils/history';
import { INIT, SET_PARTY_DETAILS, SET_PARTY_HISTORY } from './constants';

export const fetchPartyDetails = id => async dispatch => {
  try {
    const { data } = await getParty(id);
    dispatch(setPartyDetails(data));
  } catch (err) {
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to fetch party details',
    });
  }
};

export const fetchPartyHistory = params => async dispatch => {
  try {
    const { data } = await paginateRecords(params);
    dispatch(setPartyHisotry(data));
  } catch (err) {
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to fetch party history',
    });
  }
};

// eslint-disable-next-line no-unused-vars
export const onDelete = id => async dispatch => {
  try {
    await deleteParty(id);
    history.push('/party');
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

const setPartyDetails = payload => ({
  type: SET_PARTY_DETAILS,
  payload,
});

const setPartyHisotry = payload => ({
  type: SET_PARTY_HISTORY,
  payload,
});

export const partyDetailsInit = dispatch => () => {
  dispatch({
    type: INIT,
  });
};
