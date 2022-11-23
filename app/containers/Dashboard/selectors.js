import { get } from 'lodash';

export const userName = cookie => get(cookie, 'user.name', '');
