// import * as uuid from 'uuid';

import {
  FILE_UPLOAD__REQUEST,
  FILE_UPLOAD__SUCCESS,
  FILE_UPLOAD__FAILURE,
  FILE_DOWNLOAD_LINK_FETCH__REQUEST,
  FILE_DOWNLOAD_LINK_FETCH__SUCCESS,
  FILE_DOWNLOAD_LINK_FETCH__FAILURE
} from '../../shared/constants/actionTypes';


export const uploadFile = (): Action => ({
  type: FILE_UPLOAD__REQUEST,
  payload: { },
});

export const succeedToUploadFIle = (json: object): Action => ({
  type: FILE_UPLOAD__SUCCESS,
  payload: { file: json },
});

export const failToUploadFile = (error: Error): Action => ({
  type: FILE_UPLOAD__FAILURE,
  payload: { errorMessage: error.message || 'File was not uploaded.' },
});

export const requestFileDonwloadLink = (fileId: Uuid): Action => ({
  type: FILE_DOWNLOAD_LINK_FETCH__REQUEST,
  payload: { fileId },
});

export const succeedToFetchDownloadLink = (link: string): Action => ({
  type: FILE_DOWNLOAD_LINK_FETCH__SUCCESS,
  payload: { link },
});

export const failToFetchDownloadLink = (error: Error): Action => ({
  type: FILE_DOWNLOAD_LINK_FETCH__FAILURE,
  payload: { errorMessage: error.message || 'File download link was not fetched' },
});


