import {OverlayTrigger} from 'react-bootstrap';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {Avatar} from './Avatar';
import {PopoverComponent} from '../../shared/components/PopoverComponent';
import {AvatarFieldsContainer} from '../containers/AvatarFieldsContainer';

export interface IProfileAvatarSettingsDataProps {
  readonly avatarPath?: string;
}

export interface IProfileAvatarSettingsCallbackProps {
}

type ProfileAvatarSettingsProps = IProfileAvatarSettingsCallbackProps & IProfileAvatarSettingsDataProps;

export const ProfileAvatarSettings: React.SFC<ProfileAvatarSettingsProps> = ({
 avatarPath,
}) => (
  <div className="avatar-container user-profile-block">
    <h1 className="user-profile-header">Your Profile</h1>
    <Avatar
      avatarSize="avatar"
      avatarPath={avatarPath}
    />
    <OverlayTrigger
      trigger="click"
      rootClose
      placement="bottom"
      overlay={PopoverComponent({
        id: 'avatar-path-input',
        title: 'Insert your avatar URL',
        children: <AvatarFieldsContainer/>
      })}
    >
      <button className="btn btn-default">
        Change Avatar
      </button>
    </OverlayTrigger>
  </div>
);

ProfileAvatarSettings.displayName = 'ProfileAvatarSettings';
ProfileAvatarSettings.propTypes = {
  avatarPath: PropTypes.string,
};
