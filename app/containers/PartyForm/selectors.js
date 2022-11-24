import { get } from 'lodash';
import { SUPPLIER } from 'utils/appConstants';

export const name = state => get(state, 'partyForm.name', '');
export const phone = state => get(state, 'partyForm.phone', '');
export const type = state => get(state, 'partyForm.type', SUPPLIER);
export const gstNumber = state => get(state, 'partyForm.gstNumber', '');
export const panNumber = state => get(state, 'partyForm.panNumber', '');
export const category = state => get(state, 'partyForm.category', '');
export const address = state => get(state, 'partyForm.address', '');

export const isEdit = state => get(state, 'partyForm.isEdit', false);

export const isLoading = state => get(state, 'partyForm.isLoading', false);
export const errorMessage = state => get(state, 'partyForm.errorMessage', null);
export const validations = state => get(state, 'partyForm.validationError', {});
