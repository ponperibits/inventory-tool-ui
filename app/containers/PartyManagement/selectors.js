import { get } from 'lodash';

export const parties = state => get(state, 'partyManagement.parties', []);
