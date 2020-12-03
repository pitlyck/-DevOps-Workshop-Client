import * as Immutable from 'immutable';
import { Dispatch } from 'redux';
import {
  Action,
  Uuid
} from '../../helpers/types';
import {
  IMessageData,
  Message
} from '../../../src/messages/models/Message';
import { postMessageFactory } from '../../../src/messages/actionCreators/requests/postMessage';
import {
  annotatedUsers,
  authorId,
  messageId,
  text
} from '../../helpers/messages';
import { IState } from '../../../src/shared/models/IState';
import { firstUserId } from '../../helpers/users';

describe('Correctly resolves postMessage: ', () => {
  const parsedText = JSON.parse(text);
  const channelId = '26d50492-9204-4b4f-ab42-3cb63e1f3826';
  const message = new Message({
    text: parsedText,
    authorId,
    annotatedUsers,
    channelId,
  });
  const postSuccess = () => Promise.resolve({ json: (): Promise<Partial<IMessageData>> => Promise.resolve(message) });
  const postFailImmediately = () => Promise.reject(new Error('Message could not be posted'));
  const postFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('Message could not be posted')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeGetState = (): IState => {
    return {
      usersInfo: {
        currentUserId: firstUserId,
      },
      channelListing: {
        selectedChannel: channelId,
      }
    } as IState;
  };
  const fakeAction = (payload: string): Action => ({ type: 'unknown', payload });
  const fakeReceived = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const fakeAddMessage = () => fakeAction('add');
  const fakeIdGenerator = () => messageId;
  const postMessage = (post: () => Promise<any>) => postMessageFactory({
    success: fakeReceived,
    error: fakeFailed,
    postBegin: fakeAddMessage,
    post,
    idGenerator: fakeIdGenerator,
  });
  const testCases = [
    { name: ' succeeding', post: postSuccess },
    { name: ' immediately failing', post: postFailImmediately },
    { name: ' failing', post: postFail },
  ];

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  testCases.forEach(testCase => {
    it(`dispatches createMessage with ${testCase.name} post`, () => {
      postMessage(testCase.post)(parsedText, Immutable.Set<Uuid>())(fakeDispatch, fakeGetState);
      const actual = fakeDispatch.mock.calls[0];

      expect(actual[0]).toEqual(fakeAddMessage());
    });
  });

  it('dispatches messagesReceived', () =>
    postMessage(postSuccess)(parsedText, Immutable.Set<Uuid>())(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeReceived());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error immediately', () =>
    postMessage(postFailImmediately)(parsedText, Immutable.Set<Uuid>())(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error', () =>
    postMessage(postFail)(parsedText, Immutable.Set<Uuid>())(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );
});
