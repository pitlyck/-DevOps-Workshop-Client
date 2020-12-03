import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Avatar } from './Avatar';
import * as ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import {
  DropdownButton,
  MenuItem
} from 'react-bootstrap';
import * as Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import {
  LOGIN_ROUTE,
  PROFILE_VIEW_ROUTE
} from '../../shared/constants/routes';

export interface IUserCardCallbackProps {
  readonly onLogout: (userId: Uuid) => void;
}

export interface IUserCardDataProps {
  readonly username: string;
  readonly userId: string;
  readonly avatarPath?: string;
}

type UserCardProps = IUserCardDataProps & IUserCardCallbackProps;

export class UserCard extends React.PureComponent<UserCardProps> {
  static displayName = 'UserCard';
  static propTypes = {
    username: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    avatarPath: PropTypes.string,

    onLogout: PropTypes.func.isRequired,
  };

  constructor(props: any) {
    super(props);
  }

  _handleLogout = () => this.props.onLogout(this.props.userId);

  render(): JSX.Element {
    return (
        <>
          <Link to={PROFILE_VIEW_ROUTE}>
            <div className="avatar-container">
              <Avatar
                avatarSize="mini-avatar"
                avatarPath={this.props.avatarPath}
              />
            </div>
          </Link>
          <div className="user-card_username-container">
            <span>{this.props.username}</span>
          </div>
          <div className="user-card_icon-container">
            <ButtonToolbar
              className="user-card_open-user-menu-icon">
              <DropdownButton
                pullRight
                bsStyle="link"
                title={
                  <div style={{ display: 'inline-block' }}>
                    <Glyphicon glyph="chevron-down"/>
                  </div>}
                noCaret
                id="dropdown-no-caret"
              >
                <LinkContainer to={PROFILE_VIEW_ROUTE}>
                  <MenuItem
                    key="viewUserProfile"
                  >
                    <div>
                      View Profile
                    </div>
                  </MenuItem>
                </LinkContainer>
                <MenuItem divider/>
                <LinkContainer to={LOGIN_ROUTE}>
                  <MenuItem
                    key="userLogout"
                    onClick={this._handleLogout}
                  >Log Out
                  </MenuItem>
                </LinkContainer>
              </DropdownButton>
            </ButtonToolbar>
          </div>
        </>
    );
  }
}
