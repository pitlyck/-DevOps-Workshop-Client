import * as Immutable from 'immutable';
import { messagesReducer } from '../../../src/messages/reducers/messagesReducer';
import {
  IMessage,
  Message,
  MessageServerModel
} from '../../../src/messages/models/Message';
import {
  annotatedUsers,
  authorId,
  bobId,
  createdAt,
  likedByBobPopularity,
  messageId,
  text
} from '../../helpers/messages';
import { MessagePopularity } from '../../../src/messages/models/MessagePopularity';
import { createMessageFactory } from '../../../src/messages/actionCreators/createMessageFactory';
import {
  deleteMessage,
  likeMessage,
  succeedToFetchMessages,
  succeedToPostMessage
} from '../../../src/messages/actionCreators/messageActionCreators';
import { Uuid } from '../../helpers/types';

describe('messagesReducer works correctly with messages', () => {
  const parsedText = JSON.parse(text);
  const channelId = 'ec1148ca-a065-450e-bfa8-f481518fedac';
  const makeMessage = (id: Uuid) => new Message({
    id,
    text: parsedText,
    authorId,
    annotatedUsers,
    timestamp: Date.parse(createdAt),
    popularity: new MessagePopularity(),
  });
  const makeServerMessage = (serverId: Uuid) => new MessageServerModel({
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
  const initialMessage = makeMessage(messageId);
  const initialState = Immutable.OrderedMap<Uuid, IMessage>({ [messageId]: initialMessage });

  it('adds a new message correctly', () => {
    const id = 'f7d23d64-d131-4be9-9f2d-e8568104388b';
    const messageInit = new Message({
      id,
      text: parsedText,
      authorId,
      channelId,
    });
    const fakeIdGenerator = () => id;
    const fakeDateGenerator = () => Date.now();
    const expected = Immutable.OrderedMap<Uuid, IMessage>({ 'f7d23d64-d131-4be9-9f2d-e8568104388b': messageInit });
    const creationAction = createMessageFactory(fakeIdGenerator, fakeDateGenerator)({
      text: JSON.parse(text),
      authorId,
      channelId,
    });

    const tested = messagesReducer(undefined, creationAction);

    expect(tested).toEqual(expected);
  });

  it('updates the clientId to the serverId if a message is successfully created', () => {
    const serverId = 'f7d23d64-d131-4be9-9f2d-e8568104388b';
    const serverMessage = makeServerMessage(serverId);
    const expectedMessage = new Message({
      id: serverId,
      text: parsedText,
      authorId,
      annotatedUsers,
      timestamp: Date.parse(createdAt),
      popularity: new MessagePopularity(),
    });
    const expected = Immutable.OrderedMap<Uuid, IMessage>({ [serverId]: expectedMessage });
    const successAction = succeedToPostMessage(serverMessage);

    const tested = messagesReducer(initialState, successAction);

    expect(tested).toEqual(expected);
  });

  it('reorders  and converts the messages to the correct order and model', () => {
    const firstId = 'f7d23d64-d131-4be9-9f2d-e8568104388b';
    const secondId = '8727f029-40de-44a9-ba42-752e0e558f96';
    const serverMessages = [
      makeServerMessage(secondId),
      makeServerMessage(firstId),
    ];
    const expectedState = Immutable.OrderedMap<Uuid, IMessage>({
      [firstId]: makeMessage(firstId),
      [secondId]: makeMessage(secondId),
    });
    const successAction = succeedToFetchMessages(serverMessages);

    const tested = messagesReducer(undefined, successAction);

    expect(tested).toEqual(expectedState);
  });

  it('deletes a message correctly', () => {
    const expected = Immutable.OrderedMap<Uuid, IMessage>();
    const deletionAction = deleteMessage(messageId);

    const tested = messagesReducer(initialState, deletionAction);

    expect(tested).toEqual(expected);
  });

  it('edits a message correctly - likes', () => {
    const expectedMessage = initialMessage.with({ popularity: likedByBobPopularity });
    const expected = Immutable.OrderedMap<Uuid, IMessage>({ [messageId]: expectedMessage });
    const likeAction = likeMessage(messageId, bobId);

    const tested = messagesReducer(initialState, likeAction);

    expect(tested).toEqual(expected);
  });

  it('edits a message correctly - dislikes', () => {
    const expectedMessage = initialMessage.with({ popularity: likedByBobPopularity });
    const expected = Immutable.OrderedMap<Uuid, IMessage>({ [messageId]: expectedMessage });
    const likeAction = likeMessage(messageId, bobId);

    const tested = messagesReducer(initialState, likeAction);

    expect(tested).toEqual(expected);
  });

  it('does nothing if an unknown action is received', () => {
    const unknownAction = { type: 'UNKNOWN_TYPE' };

    const tested = messagesReducer(initialState, unknownAction);

    expect(tested).toEqual(initialState);
  });
});
