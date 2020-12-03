import { Dispatch } from 'redux';
import * as fetch from 'isomorphic-fetch';
import {
  deleteChannel,
  failToDeleteChannel,
  succeedToDeleteChannel,
  selectChannel
} from '../channelActionCreators';
import {
  CHANNELS_ROUTE,
  SERVER_ROUTE,
  SPECIFIC_CHANNEL_VIEW_ROUTE
} from '../../../shared/constants/routes';
import { checkStatus } from '../../../shared/utils/checkStatus';
import { getBearer } from '../../../shared/utils/getBearer';
import { IState } from '../../../shared/models/IState';
import { history } from '../../../shared/components/AppWrapper';
import { reorderChannelsRequest } from './putChannelOrder';
import { OrderedSet } from 'immutable';

interface IDeleteChannelFactoryDependencies {
  readonly deleteBegin: (id: Uuid) => Action;
  readonly success: () => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly delete: (channelId: Uuid) => Promise<Response>;
  readonly updateChannelOrder: (channelIds: OrderedSet<Uuid>) => any;
  readonly selectChannel: (id: string) => Action;
}

const deleteMessageFactoryDependencies = {
  deleteBegin: deleteChannel,
  success: succeedToDeleteChannel,
  error: failToDeleteChannel,
  delete: (channelId: Uuid) => fetch(`${SERVER_ROUTE}${CHANNELS_ROUTE}${channelId}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      authorization: getBearer(),
    },
  })
    .then(response => checkStatus(response)),
  updateChannelOrder: reorderChannelsRequest,
  selectChannel
};

const deleteChannelFactory = (dependencies: IDeleteChannelFactoryDependencies) =>
  (channelId: Uuid): any =>
    async (dispatch: Dispatch, getState: () => IState): Promise<Action> => {
      // If deleting currently selected channel, select another one first
      const currentState = getState();
      const channelsLeftIds = currentState.channelListing.channelIds.remove(channelId);
      if (currentState.channelListing.selectedChannel === channelId) {
        const newSelectedChannelId = channelsLeftIds.first();
        await dispatch(dependencies.selectChannel(newSelectedChannelId));
        history.push(SPECIFIC_CHANNEL_VIEW_ROUTE(newSelectedChannelId));
      }

      dispatch(dependencies.deleteBegin(channelId));
      return dependencies.delete(channelId)
        .then(() => {
          dispatch(dependencies.updateChannelOrder(channelsLeftIds));
          return dispatch(dependencies.success());
        })
        .catch((error: Error) => dispatch(dependencies.error(channelId, error)));
    };

export const deleteChannelRequest = deleteChannelFactory(deleteMessageFactoryDependencies);
