import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Button,
  Form
} from 'react-bootstrap';

export interface ISignUpTabProps {
  readonly onSignUpClick: (email: string, username: string) => void;
}

interface ISignUpTabState {
  readonly email: string;
  readonly username: string;
}

export class SignUpTab extends React.PureComponent<ISignUpTabProps, ISignUpTabState> {
  static displayName = 'SignUpTab';
  static propTypes = {
    onSignUpClick: PropTypes.func.isRequired,
  };

  constructor(props: ISignUpTabProps) {
    super(props);
    this.state = {
      email: '',
      username: '',
    };
  }

  _handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;
    this.setState(() => ({ email }));
  };

  _handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const username = event.currentTarget.value;
    this.setState(() => ({ username }));
  };

  _handleSignUp = (): void => {
    const { username, email } = this.state;
    this.props.onSignUpClick(email, username);
  };

  render(): JSX.Element {
    const {email, username} = this.state;
    return (
      <Form>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={this._handleEmailChange}
          />
        </div>
        <div className="form-group">
          <input
            type="Username"
            className="form-control"
            placeholder="Username"
            onChange={this._handleUsernameChange}
          />
        </div>
        <Button
          onClick={this._handleSignUp}
          bsStyle="info"
          disabled={!email || !username}
          block
        > Sign Up
        </Button>
      </Form>
    );
  }
}
