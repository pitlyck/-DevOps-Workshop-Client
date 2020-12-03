import * as React from 'react';
import * as PropTypes from 'prop-types';
import { RouteComponentProps } from 'react-router-dom';
import {
  Tab,
  Tabs,
} from 'react-bootstrap/lib';
import { withRouterPropTypes } from '../utils/routerProps';
import { LoginTab } from './LoginTab';
import { SignUpTab } from './SignUpTab';
import { Spinner } from './Spinner';

export interface ILoginPageDispatchProps extends RouteComponentProps {
  readonly onLogInClick: (email: string) => void;
  readonly onSignUpClick: (email: string, username: string) => void;
}

export interface ILoginPageStateProps {
  readonly isAuthenticating: boolean;
}

type LoginPageProps = ILoginPageDispatchProps & ILoginPageStateProps;

export class LoginPage extends React.PureComponent<LoginPageProps> {
  static displayName = 'LoginPage';

  static propTypes = {
    ...withRouterPropTypes,

    onLogInClick: PropTypes.func.isRequired,
    onSignUpClick: PropTypes.func.isRequired,
  };

  constructor(props: LoginPageProps) {
    super(props);
  }

  render(): JSX.Element {
    return (
      <div className="login-form">
        <h2 className="text-center">DevOps Workshop Client</h2>
        <Tabs
          defaultActiveKey="LogInTab"
          id="login-or-signup-user-forms"
          animation={false}
        >
          <Tab eventKey="LogInTab" title="Log In">
            <LoginTab onLogInClick={this.props.onLogInClick} />
          </Tab>
          <Tab eventKey="SignUpTab" title="Sign Up">
            <SignUpTab onSignUpClick={this.props.onSignUpClick} />
          </Tab>
        </Tabs>
        {this.props.isAuthenticating ? <Spinner/> : null}
      </div>
    );
  }
}
