import {  invalidateToken } from './actionCreators';
import * as keys from '../../constants/localStorageKeys';

export const logoutUser = () =>
    (dispatch) => {
        localStorage.removeItem(keys.SHARED_TOKEN);
        localStorage.removeItem(keys.SHARED_TOKEN_TIMESTAMP);

        dispatch(invalidateToken());
    };
