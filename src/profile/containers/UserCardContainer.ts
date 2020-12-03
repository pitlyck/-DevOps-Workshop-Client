import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {IState} from '../../shared/models/IState';
import {IUserCardCallbackProps, IUserCardDataProps, UserCard} from '../components/UserCard';
import {getCurrentUser} from '../utils/usersUtils';
import { unauthenticate } from '../actionCreators/unauthenticate';

const mapStateToProps = (state: IState): IUserCardDataProps => {
  const currentUser = getCurrentUser(state.usersInfo);
  return {
    username: currentUser.name,
    avatarPath: currentUser.avatarPath,
    userId: state.usersInfo.currentUserId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IUserCardCallbackProps => {
  return {
    onLogout: (userId: Uuid) => dispatch(unauthenticate(userId)),
  };
};

export const UserCardContainer = connect(mapStateToProps, mapDispatchToProps)(UserCard);
