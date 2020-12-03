import {combineReducers} from 'redux';
import { isLoadingMessagesReducer } from '../../messages/reducers/isLoadingMessagesReducer';
import { isLoadingChannelsReducer } from '../../channels/reducers/isLoadingChannelsReducer';
import { isLoadingUsersReducer } from '../../profile/reducers/isLoadingUsersReducer';
import { isUploadingFileReducer } from './isUploadingFileReducer';
import { isAuthenticatingReducer} from './isAuthenticatingReducer';

export const appInfoReducers = combineReducers({
  isLoadingMessages: isLoadingMessagesReducer,
  isLoadingChannels: isLoadingChannelsReducer,
  isLoadingUsers: isLoadingUsersReducer,
  isUploadingFile: isUploadingFileReducer,
  isAuthenticating: isAuthenticatingReducer,
});
