/*
 *
 * PartyForm actions
 *
 */

import history from 'utils/history';
import { get } from 'lodash';
import { addParty, editParty, getParty } from 'api/party';
import NotificationHandler from 'components/Notifications/NotificationHandler';
import {
  INIT,
  CHANGE_NAME,
  CHANGE_PHONE,
  CHANGE_TYPE,
  CHANGE_GST,
  CHANGE_PAN,
  CHANGE_CATEGORY,
  CHANGE_ADDRESS,
  SET_PARTY_DETAILS,
  SHOW_LOADING,
  VALIDATION_ERROR,
} from './constants';
import schema from './validations';

export const onSubmit = partyDetails => async dispatch => {
  try {
    const isValid = schema.isValidSync(partyDetails);
    if (!isValid) {
      const err = await schema.validate(partyDetails).catch(error => error);
      dispatch(validationFailed(err));
      return;
    }
    dispatch(showLoading(true));

    await addParty(partyDetails);
    NotificationHandler.open({
      operation: 'success',
      title: 'Party added successfully',
    });
    history.push('/party');
  } catch (err) {
    dispatch(showLoading(false));
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to add Party',
    });
  }
};

export const onEdit = (id, partyDetails) => async dispatch => {
  try {
    const isValid = schema.isValidSync(partyDetails);
    if (!isValid) {
      const err = await schema.validate(partyDetails).catch(error => error);
      dispatch(validationFailed(err));
      return;
    }
    dispatch(showLoading(true));

    await editParty(id, partyDetails);
    NotificationHandler.open({
      operation: 'success',
      title: 'Party edited successfully',
    });
    history.push('/party');
  } catch (err) {
    dispatch(showLoading(false));
    NotificationHandler.open({
      operation: 'failure',
      message:
        get(err, 'response.data', null) ||
        'Something went wrong. Please try again later',
      title: 'Unable to edit Party',
    });
  }
};

export const fetchDetails = id => async dispatch => {
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

const setPartyDetails = payload => ({
  type: SET_PARTY_DETAILS,
  payload,
});

const validationFailed = payload => ({
  type: VALIDATION_ERROR,
  payload,
});

const showLoading = payload => ({
  type: SHOW_LOADING,
  payload,
});

export const partyFormInit = dispatch => () => {
  dispatch({
    type: INIT,
  });
};

export const changeName = payload => ({
  type: CHANGE_NAME,
  payload,
});

export const changePhone = payload => ({
  type: CHANGE_PHONE,
  payload,
});

export const changeType = payload => ({
  type: CHANGE_TYPE,
  payload,
});

export const changeGst = payload => ({
  type: CHANGE_GST,
  payload,
});

export const changePan = payload => ({
  type: CHANGE_PAN,
  payload,
});

export const changeCategory = payload => ({
  type: CHANGE_CATEGORY,
  payload,
});

export const changeAddress = payload => ({
  type: CHANGE_ADDRESS,
  payload,
});
