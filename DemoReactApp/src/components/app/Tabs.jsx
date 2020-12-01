import * as React from 'react';
import * as routes from '../../constants/routes';
import { TabLink } from './TabLink.jsx';

const Tabs = () => (
    <ul className="nav nav-tabs nav-justified">
        <TabLink exact to={routes.ROOT}>Items</TabLink>
        <TabLink to={routes.PROFILE}>Profile</TabLink>
    </ul>
);

export { Tabs };