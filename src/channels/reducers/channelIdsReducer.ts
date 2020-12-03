import * as Immutable from 'immutable';
import {
  CHANNEL_CREATE, CHANNEL_DELETE, CHANNELS_POST__SUCCESS, CHANNELS_REORDER,
  CHANNELS_FETCH__SUCCESS,
  CHANNELS_ORDER_FETCH__SUCCESS
} from '../../shared/constants/actionTypes';
import { IChannelServerModel } from '../models/Channel';

const initialState: Immutable.OrderedSet<Uuid> = Immutable.OrderedSet();

export const channelIdsReducer = (prevState: Immutable.OrderedSet<Uuid> = initialState, action: Action):
  Immutable.OrderedSet<Uuid> => {
  switch (action.type) {

    case CHANNELS_FETCH__SUCCESS: {
      const receivedObjects = action.payload.channels;
      const channelIdsInCorrectOrder = receivedObjects
        .map((value: IChannelServerModel) => value && value.id)
        .reverse();

      return Immutable.OrderedSet<Uuid>(channelIdsInCorrectOrder);
    }

    case CHANNELS_ORDER_FETCH__SUCCESS: {
      const receivedChannelIds: Uuid[] = action.payload.channelIds;
      const filteredChannelIds = receivedChannelIds.filter(id => prevState.contains(id));
      return Immutable.OrderedSet<Uuid>(filteredChannelIds);
    }

    case CHANNELS_POST__SUCCESS: {
      const channel: IChannelServerModel = action.payload.channel;
      const oldId = channel.customData.clientId;
      const serverId = channel.id;

      return prevState
        .map((id: Uuid) => (id === oldId) ? serverId : id)
        .toOrderedSet();
    }

    case CHANNEL_CREATE: {
      return prevState.add(action.payload.id);
    }

    case CHANNEL_DELETE: {
      return prevState.delete(action.payload.id);
    }

    case CHANNELS_REORDER: {
      return action.payload.channelIds;
    }

    default:
      return prevState;
  }
};
