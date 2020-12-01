import {
    TODO_LIST_ITEM_CANCEL_EDITING,
    TODO_LIST_ITEM_DELETE,
    TODO_LIST_ITEM_START_EDITING,
    TODO_LIST_ITEM_UPDATE
} from '../../constants/actionTypes';

export const editedItemId = (prevState = null, action) => {
    switch(action.type) {
        case TODO_LIST_ITEM_START_EDITING:
            return action.payload.id;

        case TODO_LIST_ITEM_CANCEL_EDITING:
        case TODO_LIST_ITEM_UPDATE:
        case TODO_LIST_ITEM_DELETE:
            return null;

        default:
            return null;
    }
};
