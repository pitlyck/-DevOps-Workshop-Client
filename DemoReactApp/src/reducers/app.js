import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { todoApp } from './todo-list/todoApp';
import { profile } from './profile/profile';
import { shared } from './shared/shared';

export const app = combineReducers({
    todoApp,
    profile,
    shared,
    form,
});
