import {
    TODO_LIST_SAVING_FINISHED,
    TODO_LIST_SAVING_STARTED
} from '../../constants/actionTypes';

export const isSaving = (prevState = false, action) => {
    switch (action.type) {
        case TODO_LIST_SAVING_STARTED:
            return true;

        case TODO_LIST_SAVING_FINISHED:
            return false;

        default:
            return prevState;
    }
};
