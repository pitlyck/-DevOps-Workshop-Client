import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Route,
  RouteComponentProps,
} from 'react-router-dom';
import { ContentWrapperContainer } from '../../channels/containers/ContentWrapperContainer';
import {
  CHANNEL_VIEW_ROUTE,
  CONTENT_VIEW_ROUTE,
  LOGIN_ROUTE
} from '../constants/routes';
import { withRouterPropTypes } from '../utils/routerProps';
import { LoginPageContainer } from '../containers/LoginPageContainer';
import { PrivateRoute } from './PrivateRoute';

export interface IAppDataProps extends RouteComponentProps {
  readonly isLoggedIn: boolean;
}

export type AppProps = IAppDataProps;

export class App extends React.PureComponent<AppProps> {
  static displayName = 'App';

  static propTypes = {
    ...withRouterPropTypes,
    isLoggedIn: PropTypes.bool.isRequired,
  };

  constructor(props: any) {
    super(props);
  }

  componentDidUpdate(prevProps: IAppDataProps) {
    const { isLoggedIn, history } = this.props;
    if (!prevProps.isLoggedIn && isLoggedIn) {
      history.push(CHANNEL_VIEW_ROUTE);
    }
  }

  render(): JSX.Element {
    const { history, isLoggedIn } = this.props;
    return (
      <div className="full-height">
        <PrivateRoute
          path={CONTENT_VIEW_ROUTE}
          location={history.location}
          component={ContentWrapperContainer}
          isAuthenticated={isLoggedIn}
        />
        <Route
          exact
          location={history.location}
          path={LOGIN_ROUTE}
          component={LoginPageContainer}
        />
      </div>
    );
  }
}

