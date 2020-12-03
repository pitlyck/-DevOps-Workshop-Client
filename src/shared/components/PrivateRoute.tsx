import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Redirect,
  Route,
} from 'react-router-dom';
import * as H from 'history';
import { LOGIN_ROUTE } from '../constants/routes';

interface IPrivateRouteProps {
  readonly component: any;
  readonly isAuthenticated: boolean;
  readonly path: string;
  readonly location: H.Location<H.LocationState>;
}

export const PrivateRoute: React.SFC<IPrivateRouteProps> = (props: IPrivateRouteProps) => {
  const Component: any = props.component;
  return (
    <Route
      path={props.path}
      location={props.location}
      render={componentProps => {
        return (
          props.isAuthenticated ?
            <Component
              {...componentProps}
            />
            :
            <Redirect
              to={LOGIN_ROUTE}
            />
        );
      }
      }
    />);
};

PrivateRoute.displayName = 'PrivateRoute';
PrivateRoute.propTypes = {
  component: PropTypes.any.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  location: PropTypes.any.isRequired,
};
