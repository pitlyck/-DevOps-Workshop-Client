import {
    TODO_LIST_CLOSE_CREATE_NEW_FORM,
    TODO_LIST_ITEM_CREATE,
    TODO_LIST_OPEN_CREATE_NEW_FORM
} from '../../constants/actionTypes';

export const isCreateNewFormOpen = (prevState = false, action) => {
    switch (action.type) {
        case TODO_LIST_OPEN_CREATE_NEW_FORM:
            return true;

        case TODO_LIST_ITEM_CREATE:
        case TODO_LIST_CLOSE_CREATE_NEW_FORM:
            return false;

        default:
            return prevState;

    }
};
