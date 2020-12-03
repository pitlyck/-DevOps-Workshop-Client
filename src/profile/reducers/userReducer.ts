import {
  IUser,
  User,
} from '../models/User';
import {
  USER_CHANGE_AVATAR,
  USER_CHANGE_USERNAME,
  USER_CREATE
} from '../../shared/constants/actionTypes';

const initialState = new User();

export const userReducer = (prevState: IUser = initialState, action: Action) => {
  switch (action.type) {
    case USER_CHANGE_USERNAME: {
      const newState = prevState.with({ name: action.payload.name });

      return newState;
    }

    case USER_CHANGE_AVATAR: {
      const newState = prevState.with({ avatarPath: action.payload.avatarPath });

      return newState;
    }

    case USER_CREATE: {
      const { id, username, email } = action.payload;
      const newUser = new User({
        id,
        name: username,
        email,
      });

      return newUser;
    }

    default:
      return prevState;
  }
};
