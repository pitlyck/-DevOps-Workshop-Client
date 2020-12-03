import { Channel, ChannelServerModel } from '../../src/channels/models/Channel';
import { user1Id, user2Id } from './users';
import * as Immutable from 'immutable';
import { Uuid } from './types';


export const channelUsersArray = [user1Id, user2Id];
export const channelUsers = Immutable.List<Uuid>(channelUsersArray);

export const channel1 = new Channel({
  name: 'General',
  id: 'e569c598-91f7-47ef-a0ab-44bfb3635a12',
  users: channelUsers
});

export const channel1server = new ChannelServerModel ({
  name: channel1.name,
  id: channel1.id,
  customData: {
    users: channel1.users.toArray(),
    clientId: channel1.id
  }
});

export const channel2 = new Channel({
  name: 'Random',
  id: 'b9b0e2b0-ed4c-4a3a-ac28-4e34cc2009a7',
  users: channelUsers
});

export const channel2server = new ChannelServerModel ({
  name: channel2.name,
  id: channel2.id,
  customData: {
    users: channel2.users.toArray(),
    clientId: channel2.id
  }
});

export const channel3 = new Channel({
  name: 'Dog videos',
  id: '95832ad1-b950-4579-8a4d-c003467fcbee',
  users: channelUsers
});

export const channel4 = new Channel({
  name: 'Memes',
  id: 'd4a2872c-1ebb-4ee4-aaf5-8db84d767c63',
  users: channelUsers
});

export const channelNoUsers = new Channel({
  name: 'Work',
  id: '80f5f2e6-cd0c-4f94-a9b3-066580ee5c9e',
  users: Immutable.List([])
});
