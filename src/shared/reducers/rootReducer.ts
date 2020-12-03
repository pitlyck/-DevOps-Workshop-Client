import { channelListingReducers } from '../../channels/reducers/channelListingReducers';
import {combineReducers} from 'redux';
import {messageListingReducers} from '../../messages/reducers/messageListingReducers';
import {usersInfoReducers} from '../../profile/reducers/usersInfoReducers';
import { appInfoReducers } from './appInfoReducers';

export const rootReducer = combineReducers({
  channelListing: channelListingReducers,
  messageListing: messageListingReducers,
  usersInfo: usersInfoReducers,
  appInfo: appInfoReducers,
});
