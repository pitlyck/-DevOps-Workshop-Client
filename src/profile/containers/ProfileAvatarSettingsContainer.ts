import {connect} from 'react-redux';
import {IState} from '../../shared/models/IState';
import {IProfileAvatarSettingsDataProps, ProfileAvatarSettings} from '../components/ProfileAvatarSettings';
import {getCurrentUser} from '../utils/usersUtils';

const mapStateToProps = (state: IState): IProfileAvatarSettingsDataProps => {
  const currentUser = getCurrentUser(state.usersInfo);
  const {avatarPath} = currentUser;

  return {
    avatarPath,
  };
};

export const ProfileAvatarSettingsContainer = connect(mapStateToProps)(ProfileAvatarSettings);
