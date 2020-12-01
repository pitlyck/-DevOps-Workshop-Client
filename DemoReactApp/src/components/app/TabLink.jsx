import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
    Route,
    Link,
} from 'react-router-dom';

const TabLink = ({ children, to, exact }) => (
    <Route
        path={to}
        exact={exact}
        // eslint-disable-next-line react/no-children-prop
        children={({ match }) => (
            <li role="presentation" className={match ? 'active' : ''}>
                <Link to={to}>
                    {children}
                </Link>
            </li>
        )}
    />
);

TabLink.propTypes = ({
    to: PropTypes.string.isRequired,
    exact: PropTypes.bool,
    children: PropTypes.node.isRequired,
});

export { TabLink };