import * as Immutable from 'immutable';
import {
    SHARED_DISMISS_ERROR,
    SHARED_AUTHENTICATION_FAILED,
    PROFILE_FETCHING_FAILED,
    PROFILE_UPLOADING_FAILED,
    PROFILE_AVATAR_UPLOADING_FAILED,
    PROFILE_AVATAR_FETCHING_FAILED,
} from '../../constants/actionTypes';
import { LOCATION_CHANGE } from 'connected-react-router';

export const errors = (previousState = Immutable.OrderedMap(), action) => {
    switch (action.type) {
        case SHARED_AUTHENTICATION_FAILED:
        case PROFILE_FETCHING_FAILED:
        case PROFILE_UPLOADING_FAILED:
        case PROFILE_AVATAR_UPLOADING_FAILED:
        case PROFILE_AVATAR_FETCHING_FAILED:
            return previousState.set(action.payload.error.id, { ...action.payload.error });

        case SHARED_DISMISS_ERROR:
            return previousState.delete(action.payload.errorId);

        case LOCATION_CHANGE:
            return previousState.clear();

        default:
            return previousState;
    }
};
