import {
  AUTHENTICATION__REQUEST,
  AUTHENTICATE__SUCCESS,
  AUTHENTICATION__FAILURE,
} from '../../shared/constants/actionTypes';

export const isAuthenticatingReducer = (prevState: boolean = false, action: Action): boolean => {
  switch (action.type) {
    case AUTHENTICATION__REQUEST: {
      return true;
    }

    case AUTHENTICATE__SUCCESS:
    case AUTHENTICATION__FAILURE: {
      return false;
    }

    default:
      return prevState;
  }
};
