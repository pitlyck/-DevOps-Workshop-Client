import * as Immutable from 'immutable';
import {
    TODO_LIST_ITEM_CREATE,
    TODO_LIST_ITEM_DELETE,
    TODO_LIST_ITEM_MOVE,
} from '../../../constants/actionTypes';

export const allIds = (previousState = Immutable.List(), action) => {
    switch (action.type) {
        case TODO_LIST_ITEM_CREATE:
            return previousState.push(action.payload.item.id);

        case TODO_LIST_ITEM_DELETE:
            return previousState.filterNot(id => id === action.payload.id);

        case TODO_LIST_ITEM_MOVE: {
            const moveItemIndex = previousState.indexOf(action.payload.moveItemId);
            const destinationItemIndex = previousState.indexOf(action.payload.destinationItemId);

            if ((moveItemIndex < 0) || (destinationItemIndex < 0)) {
                return previousState;
            }

            return previousState.delete(moveItemIndex).insert(destinationItemIndex, action.payload.moveItemId);
        }

        default:
            return previousState;
    }
};
