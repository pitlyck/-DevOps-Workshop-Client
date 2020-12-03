import {
  AUTHENTICATE__SUCCESS,
  USERS_ALL_FETCH__FAILURE,
  USERS_ALL_FETCH__REQUEST,
  USERS_ALL_FETCH__SUCCESS
} from '../../shared/constants/actionTypes';

export const isLoadingUsersReducer = (prevState: boolean = false, action: Action): boolean => {
  switch (action.type) {
    case AUTHENTICATE__SUCCESS:
    case USERS_ALL_FETCH__REQUEST: {
      return true;
    }

    case USERS_ALL_FETCH__FAILURE:
    case USERS_ALL_FETCH__SUCCESS: {
      return false;
    }

    default:
      return prevState;
  }
};
