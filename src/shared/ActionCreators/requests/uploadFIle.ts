import { Dispatch } from 'redux';
import * as fetch from 'isomorphic-fetch';
import {
  uploadFile,
  succeedToUploadFIle,
  failToUploadFile,
  requestFileDonwloadLink,
  failToFetchDownloadLink,
  succeedToFetchDownloadLink
} from '../fileActionCreators';
import {
  FILE_ROUTE,
  SERVER_ROUTE,
  DOWNLOAD_LINK_ROUTE
} from '../../../shared/constants/routes';
import { checkStatus } from '../../../shared/utils/checkStatus';
import { getBearer } from '../../../shared/utils/getBearer';
import { DownloadLinkResponse } from '../../models/DownloadLinkResponse';
import { FilesUploadResponse } from '../../models/FilesUploadResponse';
import { updateUserAvatarUrl } from '../../../profile/actionCreators/requests/updateUser';

interface IUploadFileFactoryDependencies {
  readonly postBegin: () => Action;
  readonly success: (json: object) => Action;
  readonly error: (error: Error) => Action;
  readonly post: (body: FormData) => Promise<Response>;
  // Getting Download link
  readonly getLinkBegin: (id: Uuid) => Action;
  readonly getLinkSuccess: (link: string) => Action;
  readonly getLinkError: (error: Error) => Action;
  readonly getLink: (id: Uuid) => Promise<Response>;
}

const uploadFileFactoryDependencies: IUploadFileFactoryDependencies = {
  // Uploading file
  postBegin: uploadFile,
  success: succeedToUploadFIle,
  error: failToUploadFile,
  post: (data: FormData) => fetch(`${SERVER_ROUTE}${FILE_ROUTE}`, {
    method: 'POST',
    headers: {
      accept: 'text/plain',
      authorization: getBearer(),
    },
    body: data,
  })
    .then(response => checkStatus(response)),
  // Getting download link
  getLinkBegin: requestFileDonwloadLink,
  getLinkSuccess: succeedToFetchDownloadLink,
  getLinkError: failToFetchDownloadLink,
  getLink: (id: Uuid) => fetch(`${SERVER_ROUTE}${FILE_ROUTE}${id}${DOWNLOAD_LINK_ROUTE}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: getBearer(),
    },
  })
    .then(response => checkStatus(response)),
};

const uploadUserAvatarFactoryDependencies = {...uploadFileFactoryDependencies, getLinkSuccess: updateUserAvatarUrl};


const uploadFileFactory = (dependencies: IUploadFileFactoryDependencies) => (data: FormData): any =>
  (dispatch: Dispatch): Promise<Action> => {
    dispatch(dependencies.postBegin());

    return dependencies.post(data)
      .then(response => response.json())
      .then((json: FilesUploadResponse) => {
        const fileId = json[0].id;

        dispatch(dependencies.success(json));
        dispatch(dependencies.getLinkBegin(fileId));

        return dependencies.getLink(fileId)
          .then(response => response.json())
          .then((object: DownloadLinkResponse) => dispatch(dependencies.getLinkSuccess(object.fileUri)))
          .catch((error: Error) => dispatch(dependencies.getLinkError(error)));
      })
      .catch((error: Error) => dispatch(dependencies.error(error)));
  };

export const uploadFileRequest = uploadFileFactory(uploadFileFactoryDependencies);
export const uploadUserAvatarRequest = uploadFileFactory(uploadUserAvatarFactoryDependencies);


