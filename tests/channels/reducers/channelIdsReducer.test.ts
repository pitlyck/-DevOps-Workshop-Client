import { channelIdsReducer } from '../../../src/channels/reducers/channelIdsReducer';
import {
  CHANNELS_ORDER_FETCH__SUCCESS,
  CHANNELS_FETCH__SUCCESS,
  CHANNELS_POST__SUCCESS,
} from '../../../src/shared/constants/actionTypes';
import { reorderChannels, deleteChannel } from '../../../src/channels/ActionCreators/channelActionCreators';
import {
  channel1,
  channel2,
  channel3,
  channel4,
  channelUsers
} from '../../helpers/channels';
import * as Immutable from 'immutable';
import { ICreateChannelDependencies, createChannelFactory } from '../../../src/channels/ActionCreators/createChannelFactory';
import { Uuid } from '../../helpers/types';

describe('channelIdsReducer correctly keeps track of all channels in the app', () => {
  it('loads up channels from server in reverse order', () => {
    const requestAction = {
      type: CHANNELS_FETCH__SUCCESS,
      payload: {
        channels: [
          channel1,
          channel2,
        ]
      }
    };

    const expected = Immutable.OrderedSet<Uuid>([channel2.id, channel1.id]);
    const tested = channelIdsReducer(undefined, requestAction);

    expect(tested).toEqual(expected);
  });

  it('puts channel Ids in corrent order after channel order is loaded from server', () => {
    const requestAction = {
      type: CHANNELS_ORDER_FETCH__SUCCESS,
      payload: {
        channelIds: [
          channel1.id,
          channel2.id,
          channel3.id,
          channel4.id
        ]
      }
    };

    const initialState = Immutable.OrderedSet<Uuid>([
      channel3.id,
      channel1.id,
      channel2.id
    ]);

    const expected = Immutable.OrderedSet<Uuid>([
      channel1.id,
      channel2.id,
      channel3.id
    ]);
    const tested = channelIdsReducer(initialState, requestAction);

    expect(tested).toEqual(expected);
  });

  it('updates channel ids when user channels get reordered', () => {
    const channelIds = Immutable.OrderedSet<Uuid>([
      channel1.id,
      channel2.id,
    ]);

    const requestAction = reorderChannels(channelIds);

    const expected = channelIds;
    const tested = channelIdsReducer(undefined, requestAction);

    expect(tested).toEqual(expected);
  });

  it('updates channel ids when new channel is created', () => {
    const initialState = Immutable.OrderedSet<Uuid>([
      channel1.id,
      channel2.id,
    ]);
    const newChannelId = 'badbc89e-85ac-4d69-ace2-f098bb780b97';

    const newChannelDependencies: ICreateChannelDependencies = {
      name: 'New channel',
      users: channelUsers,
    };

    const createChannel = createChannelFactory(() => newChannelId);
    const requestAction = createChannel(newChannelDependencies);

    const expected = Immutable.OrderedSet<Uuid>([
      channel1.id,
      channel2.id,
      newChannelId
    ]);
    const tested = channelIdsReducer(initialState, requestAction);

    expect(tested).toEqual(expected);
  });

  it('updates channel ids when new a channel is deleted', () => {
    const initialState = Immutable.OrderedSet<Uuid>([
      channel1.id,
      channel2.id,
    ]);

    const requestAction = deleteChannel(channel2.id);

    const expected = Immutable.OrderedSet<Uuid>([
      channel1.id,
    ]);
    const tested = channelIdsReducer(initialState, requestAction);

    expect(tested).toEqual(expected);
  });

  it('updates the clientId to the serverId if a message is successfully created', () => {
    const initialState = Immutable.OrderedSet<Uuid>([
      channel1.id,
      channel2.id,
    ]);

    const serverChannel1Id = '578d4847-c69d-4051-915e-1dfbaf3c553f';

    const requestAction = {
      type: CHANNELS_POST__SUCCESS,
      payload: {
        channel: {
          id: serverChannel1Id,
          name: channel1.name,
          customData: {
            users: [],
            clientId: channel1.id
          }
        }
      }
    };

    const expected = Immutable.OrderedSet<Uuid>([
      serverChannel1Id,
      channel2.id,
    ]);
    const tested = channelIdsReducer(initialState, requestAction);

    expect(tested).toEqual(expected);
  });


  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = channelIdsReducer(Immutable.OrderedSet(), requestAction);

    expect(tested).toEqual(Immutable.OrderedSet());
  });
});
