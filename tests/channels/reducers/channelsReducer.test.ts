import { channelsReducer } from '../../../src/channels/reducers/channelsReducer';
import {
  CHANNEL_CREATE,
  CHANNEL_UPDATE,
  CHANNEL_DELETE,
  CHANNELS_FETCH__SUCCESS,
  CHANNELS_POST__SUCCESS
} from '../../../src/shared/constants/actionTypes';
import {
  channel1,
  channel2,
  channel3,
  channel1server,
  channel2server
} from '../../helpers/channels';
import * as Immutable from 'immutable';
import { Uuid } from '../../helpers/types';
import { IChannel, Channel } from '../../../src/channels/models/Channel';
import { user1Id } from '../../helpers/users';

describe('channelsReducer correctly keeps track of all the channel objects', () => {

  const channels = [[channel1.id, channel1], [channel2.id, channel2]];
  const initialState: Immutable.Map<Uuid, IChannel> = Immutable.Map(channels);

  it('updates correctly when user creates a channel', () => {
    const requestAction = {
      type: CHANNEL_CREATE,
      payload: {
        id: channel3.id,
        name: channel3.name,
        users: channel3.users
      }
    };

    const expected = Immutable.Map([[channel1.id, channel1], [channel2.id, channel2], [channel3.id, channel3]]);
    const tested = channelsReducer(initialState, requestAction);

    expect(tested).toEqual(expected);
  });

  it('updates correctly when user updates a channel', () => {
    const updatedChannel1 = new Channel({
      id: channel1.id,
      name: 'Updated name',
      users: Immutable.List([user1Id])
    });

    const requestAction = {
      type: CHANNEL_UPDATE,
      payload: updatedChannel1
    };

    const expected = Immutable.Map([[channel1.id, updatedChannel1], [channel2.id, channel2]]);
    const tested = channelsReducer(initialState, requestAction);

    expect(tested).toEqual(expected);
  });

  it('updates correctly when user deletes a channel', () => {
    const requestAction = {
      type: CHANNEL_DELETE,
      payload: {
        id: channel1.id
      }
    };

    const expected = Immutable.Map([[channel2.id, channel2]]);
    const tested = channelsReducer(initialState, requestAction);

    expect(tested).toEqual(expected);
  });

  it('correctly loads up channels when they are fetched from the server', () => {
    const requestAction = {
      type: CHANNELS_FETCH__SUCCESS,
      payload: {
        channels: [
          channel1server,
          channel2server,
        ]
      }
    };

    const expected = initialState;
    const tested = channelsReducer(undefined, requestAction);

    expect(tested).toEqual(expected);
  });

  it('updates the clientId to the serverId if a channel is successfully created on the server', () => {
    const serverId = 'bb90459d-4012-429d-9ec2-300d70d3a424';

    const requestAction = {
      type: CHANNELS_POST__SUCCESS,
      payload: {
        channel: {
          id: serverId,
          name: channel1.name,
          customData: {
            users: channel1.users.toArray(),
            clientId: channel1.id
          }
        }
      }
    };

    const newChannel1 = channel1.set('id', serverId);
    const expected = Immutable.Map([[serverId, newChannel1], [channel2.id, channel2]]);
    const tested = channelsReducer(initialState, requestAction);

    expect(tested).toEqual(expected);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = channelsReducer(initialState, requestAction);

    expect(tested).toEqual(initialState);
  });
});
