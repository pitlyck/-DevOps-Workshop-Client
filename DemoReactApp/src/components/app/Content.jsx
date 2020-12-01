import * as React from 'react';
import { Route } from 'react-router-dom';
import * as routes from '../../constants/routes';
import { TodoListRedux } from '../../containers-redux/todo-list/TodoList.jsx';
import { Profile } from '../../containers-redux/profile/Profile.jsx';

const Content = () => [
    <Route exact path={routes.ROOT} component={TodoListRedux} key="default" />,
    <Route path={routes.PROFILE} component={Profile} key="profile" />,
];

export { Content };