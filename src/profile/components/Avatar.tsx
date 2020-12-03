import * as React from 'react';
import * as PropTypes from 'prop-types';
import {defaultAvatarPath} from '../../shared/constants/avatarConfig';

interface AvatarProps {
  readonly avatarPath?: string;
  readonly avatarSize?: string;
  readonly avatarPos?: string;
}

export const Avatar: React.SFC<AvatarProps> = ({
  avatarPath,
  avatarSize,
  avatarPos,
}) => (
  <div className={'image-container ' + (avatarPos ? avatarPos : '')}>
    <img
      className={avatarSize}
      src={avatarPath || defaultAvatarPath}
    />
  </div>
);

this.Avatar.displayName = 'Avatar';
this.Avatar.propTypes = {
  avatarPath: PropTypes.string,
  class: PropTypes.string,
  avatarPos: PropTypes.string,
};
