import {
    TODO_LIST_ITEM_START_DRAGGING,
    TODO_LIST_ITEM_STOP_DRAGGING
} from '../../constants/actionTypes';

export const isDragging = (prevState = false, action) => {
    switch(action.type) {
        case TODO_LIST_ITEM_START_DRAGGING:
            return true;

        case TODO_LIST_ITEM_STOP_DRAGGING:
            return false;

        default:
            return prevState;
    }
};
