import {
    failUploadingProfileAvatar,
    startUploadingProfileAvatar,
} from './actionCreators';
import {
    dismissError,
} from '../shared/actionCreators';
import { performAuthorizedRequest } from './performAuthorizedRequest';
import { fetchFileUpload } from '../../utils/api/fetchFileUpload';
import { uploadUserDetails } from './uploadUserDetails';
import { fetchUserAvatar } from './fetchUserAvatar';
import {
    FAILED_UPDATE_AVATAR_MESSAGE,
    MILISECONDS_TO_AUTO_DISMISS_ERROR
} from '../../constants/uiConstants';

export const uploadUserAvatar = (file) =>
    async (dispatch, getState) => {
        dispatch(startUploadingProfileAvatar());

        const authToken = getState().shared.token;

        try {
            return await performAuthorizedRequest(dispatch, async () => {
                if(!file){
                    throw new Error('Avatar type is not supported or the system could not load the file.');
                }

                const uploadResult = await fetchFileUpload(authToken, file);
                if(!uploadResult || !uploadResult[0] || !uploadResult[0].id){
                    throw new Error('Avatar uploaded to the server, however, server did not store the file.');
                }

                const updatedDetails = {
                    ...getState().profile.details,
                    avatarId: uploadResult[0].id,
                };
                await dispatch(uploadUserDetails(updatedDetails));
                await dispatch(fetchUserAvatar(updatedDetails.avatarId));
            });
        }
        catch (error) {
            const dispatchedAction = dispatch(failUploadingProfileAvatar(FAILED_UPDATE_AVATAR_MESSAGE, error));
            setTimeout(() => dispatch(dismissError(dispatchedAction.payload.error.id)), MILISECONDS_TO_AUTO_DISMISS_ERROR);
            return dispatchedAction;
        }
    };
