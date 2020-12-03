import { Dispatch } from 'redux';
import * as fetch from 'isomorphic-fetch';
import * as Immutable from 'immutable';
import * as uuid from 'uuid';
import {
  createMessage,
  failToPostMessage,
  succeedToPostMessage
} from '../messageActionCreators';
import {
  CHANNELS_ROUTE,
  MESSAGES_ROUTE,
  SERVER_ROUTE
} from '../../../shared/constants/routes';
import { checkStatus } from '../../../shared/utils/checkStatus';
import {
  IMessageData,
  Message
} from '../../models/Message';
import { convertViewToServerMessageModel } from '../../utils/convertMessageModels';
import { getBearer } from '../../../shared/utils/getBearer';
import { IState } from '../../../shared/models/IState';
import { RawDraftContentState } from 'draft-js';

const postMessageFactoryDependencies = {
  postBegin: createMessage,
  success: succeedToPostMessage,
  error: failToPostMessage,
  post: (body: Partial<IMessageData>, channelId: Uuid) => fetch(`${SERVER_ROUTE}${CHANNELS_ROUTE}${channelId}/${MESSAGES_ROUTE}`, {
    method: 'POST',
    body: JSON.stringify(convertViewToServerMessageModel(body)),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      accept: 'application/json',
      authorization: getBearer(),
    },
  })
    .then(response => checkStatus(response)),
  idGenerator: uuid,
};

interface IPostMessageFactoryDependencies {
  readonly postBegin: (body: Partial<IMessageData>) => Action;
  readonly success: (json: object) => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly post: (body: Partial<IMessageData>, channelId: Uuid) => Promise<Response>;
  readonly idGenerator: () => string;
}

export const postMessageFactory = (dependencies: IPostMessageFactoryDependencies) =>
  (text: RawDraftContentState, annotatedUsers?: Immutable.Set<Uuid>): any => (dispatch: Dispatch, getState: () => IState): Promise<Action> => {
    const messageData = {
      annotatedUsers,
      authorId: getState().usersInfo.currentUserId,
      text,
      channelId: getState().channelListing.selectedChannel,
    };
    const clientId = dispatch(dependencies.postBegin(messageData)).payload.id;
    const body = new Message({ ...messageData, id: clientId });

    return dependencies.post(body, messageData.channelId)
      .then(response => response.json())
      .then(message => dispatch(dependencies.success(message)))
      .catch((error: Error) => dispatch(dependencies.error(clientId, error)));
  };

export const postMessageRequest = postMessageFactory(postMessageFactoryDependencies);
