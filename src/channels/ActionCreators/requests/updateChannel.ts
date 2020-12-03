import { Dispatch } from 'redux';
import * as fetch from 'isomorphic-fetch';
import {
  failToUpdateChannel,
  succeedToUpdateChannel,
  updateChannel
} from '../channelActionCreators';
import {
  CHANNELS_ROUTE,
  SERVER_ROUTE
} from '../../../shared/constants/routes';
import { checkStatus } from '../../../shared/utils/checkStatus';
import { IChannelData } from '../../models/Channel';
import { convertViewToServerChannelModel } from '../../utils/convertChannelModels';
import * as Immutable from 'immutable';
import { getBearer } from '../../../shared/utils/getBearer';


interface IUpdateChannelFactoryDependencies {
  readonly updateBegin: (id: Uuid, name: string, users: Immutable.List<Uuid>) => Action;
  readonly success: (json: object) => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly update: (body: Partial<IChannelData>) => Promise<Response>;
}

export const updateChannelFactoryDependencies = {
  updateBegin: updateChannel,
  success: succeedToUpdateChannel,
  error: failToUpdateChannel,
  update: (channel: Partial<IChannelData>) => fetch(`${SERVER_ROUTE}${CHANNELS_ROUTE}/${channel.id}`, {
    method: 'PUT',
    body: JSON.stringify(convertViewToServerChannelModel(channel)),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      accept: 'application/json',
      authorization: getBearer(),
    },
  })
    .then(response => checkStatus(response)),
};

export const updateChannelFactory = (dependencies: IUpdateChannelFactoryDependencies) =>
  (id: Uuid, name: string, users: Immutable.List<Uuid>): any =>
    (dispatch: Dispatch): Promise<Action> => {
      dispatch(dependencies.updateBegin(id, name, users));
      const data = { id, name, users };

      return dependencies.update(data)
        .then(response => response.json())
        .then(channel => dispatch(dependencies.success(channel)))
        .catch((error: Error) => dispatch(dependencies.error(id, error)));
    };

export const updateChannelRequest = updateChannelFactory(updateChannelFactoryDependencies);
