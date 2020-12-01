import {
    startFetchingProfileAvatar,
    failFetchingProfileAvatar,
    updateProfileaAvatar
} from './actionCreators';
import { createApiFilerUri } from '../../constants/api';
import { fetchReceive } from '../../utils/api/fetchReceive';
import { FAILED_FETCH_AVATAR_MESSAGE } from '../../constants/uiConstants';
import { performAuthorizedRequest } from './performAuthorizedRequest';

export const fetchUserAvatar = (avatarId) =>
    async (dispatch, getState) => {
        dispatch(startFetchingProfileAvatar());

        const authToken = getState().shared.token;
        const requestUri = createApiFilerUri(avatarId);

        try {
            return await performAuthorizedRequest(dispatch, async () => {
                const avatarUri = await fetchReceive(requestUri, authToken);
                dispatch(updateProfileaAvatar(avatarUri.fileUri));
            });
        }
        catch (error) {
            return dispatch(failFetchingProfileAvatar(FAILED_FETCH_AVATAR_MESSAGE, error));
        }
    };
