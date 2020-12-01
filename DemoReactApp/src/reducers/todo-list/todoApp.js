import { combineReducers } from 'redux';
import { editedItemId } from './editedItemId';
import { isCreateNewFormOpen } from './isCreateNewFormOpen';
import { isDragging } from './isDragging';
import { isSaving } from './isSaving';
import { items } from './items/items';

export const todoApp = combineReducers({
    items,
    editedItemId,
    isCreateNewFormOpen,
    isDragging,
    isSaving
});
