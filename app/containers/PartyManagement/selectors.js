import { get } from 'lodash';

export const parties = state => get(state, 'partyManagement.parties', []);
export const paginationDetails = state =>
  get(state, 'partyManagement.paginationDetails', []);
