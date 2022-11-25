import { get } from 'lodash';

export const isLoading = state => get(state, 'partyDetails.isLoading', true);
export const partyDetails = state =>
  get(state, 'partyDetails.partyDetails', {});
export const partyHistory = state =>
  get(state, 'partyDetails.partyHistory', []);
