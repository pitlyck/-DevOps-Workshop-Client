import { connect } from 'react-redux';
import { IState } from '../../shared/models/IState';
import {
  AvatarFields,
  IAvatarFieldsCallbackProps,
  IAvatarFieldsDataProps
} from '../components/AvatarFields';
import { getCurrentUser } from '../utils/usersUtils';
import { Dispatch } from 'redux';
import { uploadUserAvatarRequest } from '../../shared/ActionCreators/requests/uploadFIle';

const mapStateToProps = (state: IState): IAvatarFieldsDataProps => {
  const currentUser = getCurrentUser(state.usersInfo);

  return {
    user: currentUser,
    isUploadingFile: state.appInfo.isUploadingFile,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): IAvatarFieldsCallbackProps => ({
  onUploadFile: (data: FormData) => dispatch(uploadUserAvatarRequest(data)),
});

export const AvatarFieldsContainer = connect(mapStateToProps, mapDispatchToProps)(AvatarFields);
