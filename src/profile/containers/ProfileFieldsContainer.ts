import { connect } from 'react-redux';
import { IState } from '../../shared/models/IState';
import {
  IProfileFieldsCallbackProps,
  IProfileFieldsDataProps,
  ProfileFields
} from '../components/ProfileFields';
import { getCurrentUser } from '../utils/usersUtils';
import { Dispatch } from 'redux';
import { updateUserRequest } from '../actionCreators/requests/updateUser';

const mapStateToProps = (state: IState): IProfileFieldsDataProps => {
  const currentUser = getCurrentUser(state.usersInfo);

  return {
    user: currentUser,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IProfileFieldsCallbackProps => ({
  onSave: (updatedUsername: string) => dispatch(updateUserRequest({ updatedUsername })),
});

export const ProfileFieldsContainer = connect(mapStateToProps, mapDispatchToProps)(ProfileFields);
