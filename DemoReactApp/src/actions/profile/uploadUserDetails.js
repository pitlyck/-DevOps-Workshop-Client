import {
    startSubmit,
    stopSubmit
} from 'redux-form';
import {
    updateProfileDetails,
    failUploadingProfileDetails,
} from './actionCreators';
import {
    USER_EMAIL,
    createApiUserUri
} from '../../constants/api';
import { dismissError } from '../shared/actionCreators';
import { fetchRequest } from '../../utils/api/fetchRequest';
import {
    convertFromServerDetails,
    convertToServerDetails
} from '../../utils/api/conversions/profileDetails';
import { DETAILS_FORM_NAME } from '../../constants/formNames';
import { performAuthorizedRequest } from './performAuthorizedRequest';
import {
    FAILED_UPDATE_DETAILS_MESSAGE,
    MILISECONDS_TO_AUTO_DISMISS_ERROR,
} from '../../constants/uiConstants';

export const uploadUserDetails = (details) =>
    async (dispatch, getState) => {
        dispatch(startSubmit(DETAILS_FORM_NAME));

        const authToken = getState().shared.token;
        const requestUri = createApiUserUri(USER_EMAIL);
        const serverDetails = convertToServerDetails(details);

        try {
            await performAuthorizedRequest(dispatch, async () => {
                const receivedServerDetails = await fetchRequest(requestUri, authToken, serverDetails);
                const updatedDetails = convertFromServerDetails(receivedServerDetails);
                return dispatch(updateProfileDetails(updatedDetails));
            });
        }
        catch (error) {
            const dispatchedAction = dispatch(failUploadingProfileDetails(FAILED_UPDATE_DETAILS_MESSAGE, error));
            setTimeout(() => dispatch(dismissError(dispatchedAction.payload.error.id)), MILISECONDS_TO_AUTO_DISMISS_ERROR);
        }

        return dispatch(stopSubmit(DETAILS_FORM_NAME));
    };
