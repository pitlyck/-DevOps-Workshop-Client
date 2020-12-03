import { connect } from 'react-redux';
import {
  App,
  IAppDataProps
} from '../components/App';
import { IState } from '../models/IState';
import {
  RouteComponentProps,
  withRouter
} from 'react-router';

const mapStateToProps = (state: IState, ownProps: RouteComponentProps<any>): IAppDataProps => ({
  ...ownProps,
  isLoggedIn: !!state.usersInfo.currentUserId,
});

export const AppContainer = withRouter(connect(mapStateToProps)(App));
