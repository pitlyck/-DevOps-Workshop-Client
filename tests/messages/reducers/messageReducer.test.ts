import { createMessageFactory } from '../../../src/messages/actionCreators/createMessageFactory';
import {
  annotatedUsers,
  authorId,
  bobId,
  createdAt,
  dislikedByBobPopularity,
  likedByBobPopularity,
  messageId,
  text
} from '../../helpers/messages';
import {
  Message,
  MessageServerModel
} from '../../../src/messages/models/Message';
import { messageReducer } from '../../../src/messages/reducers/messageReducer';
import {
  dislikeMessage,
  likeMessage,
  succeedToPostMessage
} from '../../../src/messages/actionCreators/messageActionCreators';
import { MessagePopularity } from '../../../src/messages/models/MessagePopularity';

describe('messageReducer works correctly with single messages', () => {
  const parsedText = JSON.parse(text);
  const channelId = 'fb3bdc07-80d3-46a3-a014-6b56dc6a43bd';
  const initialMessage = new Message({
    text: parsedText,
    id: messageId,
    authorId,
    popularity: new MessagePopularity(),
  });

  it('creates a message correctly', () => {
    const fakeDateGenerator = () => Date.parse(createdAt);
    const fakeIdGenerator = () => messageId;
    const expected = new Message({
      text: parsedText,
      id: messageId,
      authorId,
      channelId,
      popularity: new MessagePopularity(),
    });
    const creationAction = createMessageFactory(fakeIdGenerator, fakeDateGenerator)({
      text: JSON.parse(text),
      authorId,
      channelId,
    });

    const tested = messageReducer(undefined, creationAction);

    expect(tested).toEqual(expected);
  });

  it('returns a correct model', () => {
    const serverId = '5bc5b4a4-9615-492f-a7fa-b62fe8838c60';
    const expected = new Message({
      id: serverId,
      text: parsedText,
      authorId,
      annotatedUsers,
      timestamp: Date.parse(createdAt),
      popularity: new MessagePopularity(),
    });
    const serverMessage = new MessageServerModel({
      id: serverId,
      value: text,
      createdAt: new Date(createdAt),
      customData: {
        clientId: messageId,
        popularity: new MessagePopularity(),
        authorId,
        timeStamp: createdAt,
        annotatedUsers,
      }
    });
    const postSuccess = succeedToPostMessage(serverMessage);

    const tested = messageReducer(undefined, postSuccess);

    expect(tested).toEqual(expected);
  });

  it('likes a message by a user', () => {
    const expected = new Message({
      text: parsedText,
      id: messageId,
      authorId,
      popularity: likedByBobPopularity,
    });

    const likeAction = likeMessage(messageId, bobId);

    const tested = messageReducer(initialMessage, likeAction);

    expect(tested).toEqual(expected);
  });

  it('dislikes a message by a user', () => {
    const expected = new Message({
      text: parsedText,
      id: messageId,
      authorId,
      popularity: dislikedByBobPopularity,
    });

    const dislikeAction = dislikeMessage(messageId, bobId);

    const tested = messageReducer(initialMessage, dislikeAction);

    expect(tested).toEqual(expected);
  });

  it('does nothing with an unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_TYPE' };

    const tested = messageReducer(initialMessage, unknownAction);

    expect(tested).toEqual(initialMessage);
  });
});
