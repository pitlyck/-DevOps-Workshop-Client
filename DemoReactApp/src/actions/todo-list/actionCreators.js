import { uuid } from '../../utils/uuidGenerator';
import * as actionTypes from '../../constants/actionTypes';

export const createNewItem = (newItem) => ({
    type: actionTypes.TODO_LIST_ITEM_CREATE,
    payload: {
        item: {
            ...newItem,
            // note that we have an explicit dependency and will refactor this
            // to use dependency injection in following commits
            id: uuid(),
        },
    }
});

export const updateItem = (item) => ({
    type: actionTypes.TODO_LIST_ITEM_UPDATE,
    payload: {
        item,
    }
});

export const deleteItem = (id) => ({
    type: actionTypes.TODO_LIST_ITEM_DELETE,
    payload: {
        id,
    }
});

export const moveItem = (moveItemId, destinationItemId) => ({
    type: actionTypes.TODO_LIST_ITEM_MOVE,
    payload: {
        moveItemId,
        destinationItemId,
    }
});

export const startEditingItem = (id) => ({
    type: actionTypes.TODO_LIST_ITEM_START_EDITING,
    payload: {
        id,
    }
});

export const cancelEditingItem = () => ({
    type: actionTypes.TODO_LIST_ITEM_CANCEL_EDITING,
});

export const openCreateNewForm = () => ({
    type: actionTypes.TODO_LIST_OPEN_CREATE_NEW_FORM,
});

export const closeCreateNewForm = () => ({
    type: actionTypes.TODO_LIST_CLOSE_CREATE_NEW_FORM,
});

export const startDragging = () => ({
    type: actionTypes.TODO_LIST_ITEM_START_DRAGGING,
});

export const stopDragging = () => ({
    type: actionTypes.TODO_LIST_ITEM_STOP_DRAGGING,
});

export const savingStarted = () => ({
    type: actionTypes.TODO_LIST_SAVING_STARTED,
});

export const savingFinished = () => ({
    type: actionTypes.TODO_LIST_SAVING_FINISHED,
});