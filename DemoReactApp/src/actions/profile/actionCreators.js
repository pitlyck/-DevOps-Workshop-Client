import * as actionTypes from '../../constants/actionTypes';
import { errorActionFactory } from '../../utils/errorActionFactory';

export const updateProfileDetails = (details) => ({
    type: actionTypes.PROFILE_UPDATE_DETAILS,
    payload: {
        details,
    }
});

export const updateProfileaAvatar = (avatarUri) => ({
    type: actionTypes.PROFILE_UPDATE_AVATAR,
    payload: {
        avatarUri,
    }
});

export const startFetchingProfileDetails = () => ({
    type: actionTypes.PROFILE_FETCHING_STARTED,
});

export const startFetchingProfileAvatar = () => ({
    type: actionTypes.PROFILE_AVATAR_FETCHING_STARTED,
});

export const startUploadingProfileAvatar = () => ({
    type: actionTypes.PROFILE_AVATAR_UPLOADING_STARTED,
});

export const failFetchingProfileDetails = errorActionFactory(actionTypes.PROFILE_FETCHING_FAILED);

export const failUploadingProfileDetails = errorActionFactory(actionTypes.PROFILE_UPLOADING_FAILED);

export const failUploadingProfileAvatar = errorActionFactory(actionTypes.PROFILE_AVATAR_UPLOADING_FAILED);

export const failFetchingProfileAvatar = errorActionFactory(actionTypes.PROFILE_AVATAR_FETCHING_FAILED);
