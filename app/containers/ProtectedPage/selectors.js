import { get } from 'lodash';

export const isLoading = state => get(state, 'authPage.isLoading', false);

export const isUser = state => get(state, 'authPage.isUser', false);
