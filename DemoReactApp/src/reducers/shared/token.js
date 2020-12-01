import {
    SHARED_RECEIVE_TOKEN,
    SHARED_INVALIDATE_TOKEN,
    SHARED_AUTHENTICATION_FAILED,
} from '../../constants/actionTypes';

export const token = (prevState = null, action) => {
    switch (action.type) {
        case SHARED_RECEIVE_TOKEN:
            return action.payload.token;

        case SHARED_AUTHENTICATION_FAILED:
        case SHARED_INVALIDATE_TOKEN:
            return null;

        default:
            return prevState;
    }
};
