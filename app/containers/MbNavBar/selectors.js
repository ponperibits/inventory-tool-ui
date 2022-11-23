import { get } from 'lodash';

export const getName = cookie => get(cookie, 'user.name', 'User');
