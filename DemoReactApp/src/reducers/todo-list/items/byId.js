import * as Immutable from 'immutable';
import {
    TODO_LIST_ITEM_CREATE,
    TODO_LIST_ITEM_DELETE,
    TODO_LIST_ITEM_UPDATE
} from '../../../constants/actionTypes';

export const byId = (previousState = Immutable.Map(), action) => {
    switch (action.type) {
        case TODO_LIST_ITEM_CREATE:
            return previousState.set(action.payload.item.id, { ...action.payload.item });

        case TODO_LIST_ITEM_UPDATE:
            return previousState.mergeIn([action.payload.item.id], { ...action.payload.item });

        case TODO_LIST_ITEM_DELETE:
            return previousState.delete(action.payload.id);

        default:
            return previousState;
    }
};
