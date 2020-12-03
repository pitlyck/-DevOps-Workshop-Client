import { Action } from '../../helpers/types';
import { Dispatch } from 'redux';
import {
  IMessage,
  IMessageData,
  Message
} from '../../../src/messages/models/Message';
import {
  annotatedUsers,
  authorId,
  dislikedByBobPopularity,
  likedByBobPopularity,
  messageId,
  text
} from '../../helpers/messages';
import { updateMessageFactory } from '../../../src/messages/actionCreators/requests/updateMessage';
import {
  IMessagePopularity,
  MessagePopularity
} from '../../../src/messages/models/MessagePopularity';
import { IState } from '../../../src/shared/models/IState';
import { firstUserId } from '../../helpers/users';

describe('Correctly resolves updateMessage: ', () => {
  interface ISpecificPreferenceDeps {
    readonly updateBegin: () => Action;
    readonly updatePopularity: () => IMessage;
  }
  const parsedText = JSON.parse(text);
  const channelId = '26d50492-9204-4b4f-ab42-3cb63e1f3826';
  const makeMessage = (popularity: IMessagePopularity) => new Message({
    id: messageId,
    text: parsedText,
    authorId,
    annotatedUsers,
    channelId,
    popularity,
  });
  const message = makeMessage(new MessagePopularity());
  const updateSuccess = () => Promise.resolve({ json: (): Promise<Partial<IMessageData>> => Promise.resolve(message) });
  const updateFailImmediately = () => Promise.reject(new Error('Message could not be updated'));
  const updateFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('Message could not be updated')) });
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
  const fakeAction = (payload: string | IMessage): Action => ({ type: 'UNKNOWN', payload });
  const fakeSuccess = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const fakeDislikeMessage = () => makeMessage(dislikedByBobPopularity);
  const fakeDislikeBegin = () => fakeAction('dislike begins');
  const fakeLikeMessage = () => makeMessage(likedByBobPopularity);
  const fakeLikeBegin = () => fakeAction('like begins');
  const makePreference = (updateBegin: () => Action, updatePopularity: () => IMessage): ISpecificPreferenceDeps => ({
    updateBegin,
    updatePopularity,
  });
  const likePreference: ISpecificPreferenceDeps = makePreference(fakeLikeBegin, fakeLikeMessage);
  const dislikePreference: ISpecificPreferenceDeps = makePreference(fakeDislikeBegin, fakeDislikeMessage);
  const updateMessage = (update: () => Promise<any>, likeOrDislike: ISpecificPreferenceDeps) => updateMessageFactory({
    success: fakeSuccess,
    error: fakeFailed,
    updatePopularity: likeOrDislike.updatePopularity,
    updateBegin: likeOrDislike.updateBegin,
    update,
  });

  const testCases = [
    { name: ' succeeding like', update: updateSuccess, preference: likePreference },
    { name: ' immediately failing like', update: updateFailImmediately, preference: likePreference },
    { name: ' failing like', update: updateFail, preference: likePreference },
    { name: ' succeeding dislike', update: updateSuccess, preference: dislikePreference },
    { name: ' immediately failing dislike', update: updateFailImmediately, preference: dislikePreference },
    { name: ' failing dislike', update: updateFail, preference: dislikePreference },
  ];

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  testCases.forEach(testCase => {

    it(`dispatches likeBegin with ${testCase.name} update`, () => {
      updateMessage(testCase.update, testCase.preference)(message)(fakeDispatch, fakeGetState);
      updateMessage(updateSuccess, likePreference)(message)(fakeDispatch, fakeGetState);
      const actual = fakeDispatch.mock.calls;

      console.log(fakeDispatch.mock.calls);
      console.log(actual[0]);
      console.log(actual[1]);
      // expect(actual[0][0]).toEqual(testCase.preference.updateBegin());
      expect(actual[0][0]).toEqual(testCase.preference.updateBegin());
    });
  });

  it('dispatches messagesUpdated when liked', () =>
    updateMessage(updateSuccess, likePreference)(message)(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        console.log(fakeDispatch.mock.calls);
        console.log(actual);
        console.log(actual[0]);
        console.log(actual[1]);
        expect(actual[0]).toEqual(fakeSuccess());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error immediately when liked', () =>
    updateMessage(updateFailImmediately, likePreference)(message)(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error when liked', () =>
    updateMessage(updateFail, likePreference)(message)(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        console.log(actual);
        console.log(fakeDispatch.mock.calls);
        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );
  it('dispatches messagesUpdated when disliked', () =>
    updateMessage(updateSuccess, dislikePreference)(message)(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        console.log(fakeDispatch.mock.calls);
        console.log(actual);
        console.log(actual[0]);
        console.log(actual[1]);
        expect(actual[0]).toEqual(fakeSuccess());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error immediately when disliked', () =>
    updateMessage(updateFailImmediately, dislikePreference)(message)(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error when disliked', () =>
    updateMessage(updateFail, dislikePreference)(message)(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        console.log(actual);
        console.log(fakeDispatch.mock.calls);
        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );
});
