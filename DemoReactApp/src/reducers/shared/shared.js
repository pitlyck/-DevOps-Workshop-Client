import { combineReducers } from 'redux';
import { isAuthenticating } from './isAuthenticating';
import { token } from './token';
import { errors } from './errors';

export const shared = combineReducers({
    isAuthenticating,
    token,
    errors,
});
