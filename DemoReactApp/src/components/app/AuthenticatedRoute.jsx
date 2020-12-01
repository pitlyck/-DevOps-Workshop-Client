import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
    Route,
    Redirect
} from 'react-router-dom';
import * as routes from '../../constants/routes';

const renderWithRedirect =
    (isAuthenticated, remainingOriginalProps) =>
        (SecuredComponent) => {
            return class AuthenticationRouteSwitch extends React.PureComponent {
                static propTypes = {
                    location: PropTypes.object.isRequired,
                };

                render() {
                    const { location: originalLocation } = this.props;

                    return (
                        isAuthenticated
                            ? <SecuredComponent {...remainingOriginalProps} />
                            : <Redirect to={{
                                pathname: routes.LOGIN,
                                state: { from: originalLocation }
                            }} />
                    );
                }
            };
        };

const AuthenticatedRoute = ({ component, isAuthenticated, ...rest }) => (
    <Route {...rest} component={renderWithRedirect(isAuthenticated, rest)(component)} />
);

AuthenticatedRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
};

export { AuthenticatedRoute };