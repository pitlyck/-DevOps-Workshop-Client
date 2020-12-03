import {
  FILE_DOWNLOAD_LINK_FETCH__SUCCESS,
  FILE_UPLOAD__REQUEST,
  USER_CHANGE_AVATAR,
} from '../../../src/shared/constants/actionTypes';
import { isUploadingFileReducer } from '../../../src/shared/reducers/isUploadingFileReducer';

describe('isUploadingFileReducer correctly changes the isUploadingFile flag', () => {
  it('changes the flag to true if the file is being uploaded', () => {
    const requestAction = { type: FILE_UPLOAD__REQUEST };

    const tested = isUploadingFileReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the flag to false if the file upload succeeded', () => {
    const requestAction = { type: FILE_DOWNLOAD_LINK_FETCH__SUCCESS };

    const tested = isUploadingFileReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the flag to false if the avatar upload succeeded', () => {
    const requestAction = { type: USER_CHANGE_AVATAR };

    const tested = isUploadingFileReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = isUploadingFileReducer(true, requestAction);

    expect(tested).toEqual(true);
  });
});
