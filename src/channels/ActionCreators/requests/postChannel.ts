import { Dispatch } from 'redux';
import * as fetch from 'isomorphic-fetch';
import * as uuid from 'uuid';
import {
  createChannel,
  failToPostChannel,
  succeedToPostChannel,
  reorderChannels,
  succeedToReorderChannels,
  failToReorderChannels
} from '../channelActionCreators';

import {
  CHANNELS_ROUTE,
  SERVER_ROUTE
} from '../../../shared/constants/routes';
import { checkStatus } from '../../../shared/utils/checkStatus';
import { ICreateChannelDependencies } from '../createChannelFactory';
import {
  Channel,
  IChannelData
} from '../../models/Channel';
import { convertViewToServerChannelModel } from '../../utils/convertChannelModels';
import { getBearer } from '../../../shared/utils/getBearer';
import * as Immutable from 'immutable';
import { updateOrderFetch } from './putChannelOrder';
import { IState } from '../../../shared/models/IState';
import { AppData } from '../../models/AppData';

interface IPostChannelFactoryDependencies {
  readonly postBegin: (body: Partial<IChannelData>) => Action;
  readonly success: (json: object) => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly post: (body: Partial<IChannelData>) => Promise<Response>;
  readonly idGenerator: () => string;
  // Channel ordering
  readonly updateOrderBegin: (body: Immutable.OrderedSet<Uuid>) => Action;
  readonly updateOrderSuccess: (json: object) => Action;
  readonly updateOrderError: (error: Error) => Action;
  readonly updateOrder: (body: Immutable.OrderedSet<Uuid>) => Promise<Response>;
}

const postChannelFactoryDependencies = {
  postBegin: createChannel,
  success: succeedToPostChannel,
  error: failToPostChannel,
  post: (body: Partial<IChannelData>) => fetch(`${SERVER_ROUTE}${CHANNELS_ROUTE}`, {
    method: 'POST',
    body: JSON.stringify(convertViewToServerChannelModel(body)),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      accept: 'application/json',
      authorization: getBearer(),
    },
  })
    .then(response => checkStatus(response)),
  idGenerator: uuid,
  // Channel ordering
  updateOrderBegin: reorderChannels,
  updateOrderSuccess: succeedToReorderChannels,
  updateOrderError: failToReorderChannels,
  updateOrder: updateOrderFetch
};

export const postChannelFactory = (dependencies: IPostChannelFactoryDependencies) => (data: ICreateChannelDependencies): any =>
  (dispatch: Dispatch, getState: () => IState): Promise<Action> => {
    const clientId = dispatch(dependencies.postBegin(data)).payload.id;
    const body = new Channel({ ...data, id: clientId });

    return dependencies.post(body)
      .then(response => response.json())
      .then((json) => {
        const newChannelIds = getState().channelListing.channelIds.remove(clientId).add(json.id);

        dispatch(dependencies.success(json));
        dispatch(dependencies.updateOrderBegin(newChannelIds));

        return dependencies.updateOrder(newChannelIds)
          .then(response => response.json())
          .then((appData: AppData) => dispatch(dependencies.updateOrderSuccess(appData)))
          .catch((error: Error) => dispatch(dependencies.updateOrderError(error)));
      })
      .catch((error: Error) => dispatch(dependencies.error(clientId, error)));
  };

export const postChannelRequest = postChannelFactory(postChannelFactoryDependencies);
