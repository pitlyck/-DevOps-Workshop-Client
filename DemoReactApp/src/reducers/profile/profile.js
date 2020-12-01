import { combineReducers } from 'redux';
import { details } from './details';
import { avatarUri } from './avatarUri';
import { isFetchingDetails } from './isFetchingDetails';
import { isFetchingAvatar } from './isFetchingAvatar';
import { isUploadingAvatar } from './isUploadingAvatar';

export const profile = combineReducers({
    details,
    avatarUri,
    isFetchingDetails,
    isFetchingAvatar,
    isUploadingAvatar,
});
