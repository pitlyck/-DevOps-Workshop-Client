import { Dispatch } from 'redux';
import { Action } from '../../helpers/types';
import {
  IMessageData,
  Message
} from '../../../src/messages/models/Message';
import { deleteMessageFactory } from '../../../src/messages/actionCreators/requests/deleteMessage';
import {
  annotatedUsers,
  authorId,
  likedByBobPopularity,
  messageId,
  text
} from '../../helpers/messages';
import { IState } from '../../../src/shared/models/IState';

describe('Correctly resolves deleteMessage: ', () => {
  const parsedText = JSON.parse(text);
  const channelId = '26d50492-9204-4b4f-ab42-3cb63e1f3826';
  const message = new Message({
    text: parsedText,
    authorId,
    annotatedUsers,
    channelId,
    popularity: likedByBobPopularity,
  });
  const deleteSuccess = () => Promise.resolve({ json: (): Promise<Partial<IMessageData>> => Promise.resolve(message) });
  const deleteFailImmediately = () => Promise.reject(new Error('Message could not be deleted'));
  const deleteFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('Message could not be deleted')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeGetState = (): IState => {
    return {
      channelListing: {
        selectedChannel: channelId,
      }
    } as IState;
  };
  const fakeAction = (payload: string): Action => ({ type: 'unknown', payload });
  const fakeReceived = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const fakeAddMessage = () => fakeAction('add');
  const deleteMessage = (deleteRes: () => Promise<any>) => deleteMessageFactory({
    success: fakeReceived,
    error: fakeFailed,
    deleteBegin: fakeAddMessage,
    delete: deleteRes,
  });
  const testCases = [
    { name: ' succeeding', delete: deleteSuccess },
    { name: ' immediately failing', delete: deleteFailImmediately },
    { name: ' failing', delete: deleteFail },
  ];

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  testCases.forEach(testCase => {
    it(`dispatches createMessage with ${testCase.name} delete`, () => {
      deleteMessage(testCase.delete)(messageId)(fakeDispatch, fakeGetState);
      const actual = fakeDispatch.mock.calls[0];

      expect(actual[0]).toEqual(fakeAddMessage());
    });
  });

  it('dispatches messagesReceived', () =>
    deleteMessage(deleteSuccess)(messageId)(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeReceived());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error immediately', () =>
    deleteMessage(deleteFailImmediately)(messageId)(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error', () =>
    deleteMessage(deleteFail)(messageId)(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );
});
