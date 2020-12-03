import {combineReducers} from 'redux';
import {messagesReducer} from './messagesReducer';

export const messageListingReducers = combineReducers({
  messages: messagesReducer,
});
