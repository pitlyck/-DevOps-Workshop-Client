import { combineReducers } from 'redux';
import { allIds } from './allIds';
import { byId } from './byId';

export const items = combineReducers({
    allIds,
    byId,
});
