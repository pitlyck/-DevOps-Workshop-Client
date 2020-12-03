import { Dispatch } from 'redux';
import {
  Action,
  Uuid
} from '../../helpers/types';
import {
  IMessageServerModel,
  MessageServerModel
} from '../../../src/messages/models/Message';
import {
  annotatedUsers,
  authorId,
  createdAt,
  messageId,
  text
} from '../../helpers/messages';
import { MessagePopularity } from '../../../src/messages/models/MessagePopularity';
import { fetchMessagesFactory } from '../../../src/messages/actionCreators/requests/fetchMessages';
import { IState } from '../../../src/shared/models/IState';

describe('Correctly resolves fetchMessages: ', () => {
  const secondMessageId = '73a4681e-3066-487b-b214-61d7cad0b4aa';
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
  const messages = [
    makeServerMessage(messageId),
    makeServerMessage(secondMessageId)
  ];

  const fetchSuccess = () => Promise.resolve({ json: ((): Promise<IMessageServerModel[]> => Promise.resolve(messages)) });
  const fetchFailImmediately = () => Promise.reject(new Error('Messages could not be fetched'));
  const fetchFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('Messages could not be fetched')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeAction = (payload: string): Action => ({ type: 'UNKNOWN', payload });
  const fakeRequest = () => fakeAction('request');
  const fakeReceived = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const channelId = '26d50492-9204-4b4f-ab42-3cb63e1f3826';
  const fakeIdGenerator = () => '98dbde18-639e-49a6-8e51-603ceb2ae92d';
  const fakeGetState = (): IState => {
    return {
      channelListing: {
        selectedChannel: channelId,
      }
    } as IState;
  };
  const testCases = [
    { name: ' succeeding', fetch: fetchSuccess },
    { name: ' immediately failing', fetch: fetchFailImmediately },
    { name: ' failing', fetch: fetchFail },
  ];
  const fetchMessages = (fetch: () => Promise<any>) => fetchMessagesFactory({
    fetchBegin: fakeRequest,
    fetch,
    success: fakeReceived,
    error: fakeFailed,
    idGenerator: fakeIdGenerator,
  });

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  testCases.forEach((testCase) => {
    it(`dispatches requestMessages with ${testCase.name} fetch`, () => {
      fetchMessages(testCase.fetch)()(fakeDispatch, fakeGetState);
      const actual = fakeDispatch.mock.calls[0];

      expect(actual[0]).toEqual(fakeRequest());
    });
  });

  it('dispatches messagesReceived', () =>
    fetchMessages(fetchSuccess)()(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeReceived());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error immediately', () =>
    fetchMessages(fetchFailImmediately)()(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error', () => fetchMessages(fetchFail)()(fakeDispatch, fakeGetState)
    .then(() => {
      const actual = fakeDispatch.mock.calls[1];

      expect(actual[0]).toEqual(fakeFailed());
      expect(fakeDispatch.mock.calls.length).toBe(2);
    })
  );
});
