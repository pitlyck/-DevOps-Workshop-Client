import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {
  ILoginPageDispatchProps,
  ILoginPageStateProps,
  LoginPage,
} from '../components/LoginPage';
import {
  RouteComponentProps,
  withRouter
} from 'react-router';
import { auth } from '../../profile/actionCreators/requests/authenticateRequest';
import { signUpRequests } from '../../profile/actionCreators/requests/signUpRequests';
import { IState } from '../models/IState';

const mapStateToProps = (state: IState): ILoginPageStateProps => {
  return {
    isAuthenticating: state.appInfo.isAuthenticating,
  };
};

const mapDispatchToProps = (dispatch: Dispatch, ownProps: RouteComponentProps<any>): ILoginPageDispatchProps => ({
  onLogInClick: (email: string) => dispatch(auth(email)),
  onSignUpClick: (email: string, username: string) => dispatch(signUpRequests({ email, username })),
  ...ownProps,
});

export const LoginPageContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
