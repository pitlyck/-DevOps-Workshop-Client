import {combineReducers} from 'redux';
import {currentUserReducer} from './currentUserReducer';
import {usersReducer} from './usersReducer';

export const usersInfoReducers = combineReducers({
  currentUserId: currentUserReducer,
  users: usersReducer,
});
