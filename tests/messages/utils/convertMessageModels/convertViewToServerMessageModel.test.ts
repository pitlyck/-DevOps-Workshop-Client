import {
  Message,
  MessageServerModel
} from '../../../../src/messages/models/Message';
import { convertViewToServerMessageModel } from '../../../../src/messages/utils/convertMessageModels';
import {
  annotatedUsers,
  authorId,
  createdAt,
  messageId,
  text
} from '../../../helpers/messages';
import { MessagePopularity } from '../../../../src/messages/models/MessagePopularity';

describe('Correctly converts from the client to the server model', () => {
  it('returns the clientModel when a serverModel is received', () => {
    const clientMessage = new Message({
      authorId,
      timestamp: Date.parse(createdAt),
      id: messageId,
      text: JSON.parse(text),
        popularity: new MessagePopularity(),
      annotatedUsers,
    });

    const serverMessage = new MessageServerModel({
      value: text,
      customData: {
        clientId: messageId,
        popularity: new MessagePopularity(),
        authorId,
        annotatedUsers,
      }
    });

    const actual = convertViewToServerMessageModel(clientMessage);

    expect(actual).toEqual(serverMessage);
  });
});
