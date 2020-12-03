import {
  FILE_UPLOAD__REQUEST,
  FILE_DOWNLOAD_LINK_FETCH__SUCCESS,
  USER_CHANGE_AVATAR
} from '../../shared/constants/actionTypes';

export const isUploadingFileReducer = (prevState: boolean = false, action: Action): boolean => {
  switch (action.type) {
    case FILE_UPLOAD__REQUEST: {
      return true;
    }

    case USER_CHANGE_AVATAR:
    case FILE_DOWNLOAD_LINK_FETCH__SUCCESS: {
      return false;
    }

    default:
      return prevState;
  }
};
