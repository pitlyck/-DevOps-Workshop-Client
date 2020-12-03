import { Dispatch } from 'redux';
import * as fetch from 'isomorphic-fetch';
import * as uuid from 'uuid';
import {
  failToFetchMessages,
  fakeReceiveMessages,
  requestMessages,
  succeedToFetchMessages
} from '../messageActionCreators';
import {
  CHANNELS_ROUTE,
  MESSAGES_ROUTE,
  SERVER_ROUTE
} from '../../../shared/constants/routes';
import { checkStatus } from '../../../shared/utils/checkStatus';
import { getBearer } from '../../../shared/utils/getBearer';
import { IState } from '../../../shared/models/IState';

const fetchMessagesFactoryDependencies = (fake: boolean) => ({
  fetchBegin: fake ? fakeReceiveMessages : requestMessages,
  success: succeedToFetchMessages,
  error: failToFetchMessages,
  fetch: (channelId: Uuid) => fetch(`${SERVER_ROUTE}${CHANNELS_ROUTE}${channelId}/${MESSAGES_ROUTE}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: getBearer(),
    },
  })
    .then(response => checkStatus(response)),
  idGenerator: uuid,
});

interface IFetchMessagesFactoryDependencies {
  readonly fetchBegin: () => Action;
  readonly success: (json: object) => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly fetch: (channelId: Uuid) => Promise<Response>;
  readonly idGenerator: () => string;
}

export const fetchMessagesFactory = (dependencies: IFetchMessagesFactoryDependencies) =>
  (): any => (dispatch: Dispatch, getState: () => IState): Promise<Action> => {
    dispatch(dependencies.fetchBegin());
    const errorId = dependencies.idGenerator();
    const currentChannelId = getState().channelListing.selectedChannel;

    return dependencies.fetch(currentChannelId)
      .then(response => response.json())
      .then(messages => dispatch(dependencies.success(messages)))
      .catch((error: Error) => dispatch(dependencies.error(errorId, error)));
  };

export const fetchMessages = (fake: boolean = false): any => fetchMessagesFactory(fetchMessagesFactoryDependencies(fake))();
