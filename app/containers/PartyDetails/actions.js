/*
 *
 * PartyDetails actions
 *
 */

import NotificationHandler from 'components/Notifications/NotificationHandler';
import { get } from 'lodash';
import { getParty } from 'api/party';
import { getRecords } from 'api/record';
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
    const { data } = await getRecords(params);
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
