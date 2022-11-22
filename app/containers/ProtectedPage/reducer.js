import produce from 'immer';
import { AUTHENTICATE_USER, AUTH_PAGE_INIT } from './constants';

const initialState = {
  isLoading: true,
  isUser: null,
};

const AuthReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, draft => {
    switch (action.type) {
      case AUTH_PAGE_INIT:
        return initialState;
      case AUTHENTICATE_USER: {
        draft.isLoading = false;
        draft.isUser = action.payload.isUser;
        break;
      }
      default:
        break;
    }
  });

export default AuthReducer;
