import * as Immutable from 'immutable';
import { IChannel, Channel, IChannelServerModel } from '../models/Channel';
import { CHANNEL_CREATE, CHANNEL_UPDATE, CHANNEL_DELETE,
         CHANNELS_FETCH__SUCCESS, CHANNELS_POST__SUCCESS} from '../../shared/constants/actionTypes';
import { convertServerToViewChannelModel } from '../utils/convertChannelModels';

const initialState = Immutable.Map<Uuid, IChannel>();

export const channelsReducer = (prevState: Immutable.Map<Uuid, IChannel> = initialState, action: Action): Immutable.Map<Uuid, IChannel> => {
  switch (action.type) {
    case CHANNELS_FETCH__SUCCESS: {
      const channels = action.payload.channels
        .map((value: IChannelServerModel) => [value.id, convertServerToViewChannelModel(value)]);
      return Immutable.Map<Uuid, IChannel>(channels);
    }

    case CHANNEL_CREATE: {
      const { id, name, users } = action.payload;
      const newChannel = new Channel({
        id,
        name,
        users,
      });
      return prevState.set(newChannel.id, newChannel);
    }

    case CHANNELS_POST__SUCCESS: {
      const oldId = action.payload.channel.customData.clientId;
      const newChannelServer: IChannelServerModel = action.payload.channel;
      const newChannelView = convertServerToViewChannelModel(newChannelServer);

      return prevState
        .mapEntries<string, IChannel>((entry: [string, IChannel]) =>
          (entry[0] === oldId)
            ? [ newChannelView.id, newChannelView ]
            : entry)
        .toMap();
    }

    case CHANNEL_UPDATE: {
      const { id, name, users } = action.payload;
      const newChannel = new Channel({
        id,
        name,
        users
      });

      return prevState.set(id, newChannel);
    }

    case CHANNEL_DELETE: {
      return prevState.delete(action.payload.id);
    }

    default:
      return prevState;
  }
};
