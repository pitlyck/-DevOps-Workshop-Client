import {
  Channel,
  ChannelServerModel
} from '../../../../src/channels/models/Channel';
import { convertServerToViewChannelModel } from '../../../../src/channels/utils/convertChannelModels';
import {
  channel1
} from '../../../helpers/channels';
import { user1Id, user2Id } from '../../../helpers/users';

describe('Correctly converts from the server channel model to the client channel model', () => {
  it('returns the clientModel when a serverModel is received', () => {
    const clientChannel = channel1;

    const serverChannel = new ChannelServerModel({
      id: channel1.id,
      name: channel1.name,
      customData: {
        users: [user1Id, user2Id]
      }
    });

    const actual = convertServerToViewChannelModel(serverChannel);

    expect(actual).toEqual(clientChannel);
  });
});
