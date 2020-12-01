import {
    failAuthentication,
    invalidateToken
} from '../shared/actionCreators';
import { EXPIRED_AUTHENTICATION_MESSAGE } from '../../constants/uiConstants';

export const performAuthorizedRequest = async (dispatch, requestAction) => {
    try {
        return await requestAction();
    }
    catch (error) {
        if (error.statusCode === 401) {
            dispatch(invalidateToken());
            return dispatch(failAuthentication(EXPIRED_AUTHENTICATION_MESSAGE));
        }

        throw error;
    }
};