import {
  Channel,
  ChannelServerModel
} from '../../../../src/channels/models/Channel';
import { convertViewToServerChannelModel } from '../../../../src/channels/utils/convertChannelModels';
import {
  channel1
} from '../../../helpers/channels';
import { user1Id, user2Id } from '../../../helpers/users';

describe('Correctly converts from the client channel model to the server channel model', () => {
  it('returns the clientModel when a serverModel is received', () => {
    const clientChannel = channel1;

    const serverChannel = new ChannelServerModel({
      name: channel1.name,
      customData: {
        users: [user1Id, user2Id],
        clientId: channel1.id
      }
    });

    const actual = convertViewToServerChannelModel(clientChannel);

    expect(actual).toEqual(serverChannel);
  });
});
