import { Dispatch } from 'redux';
import {
  IChannelServerModel,
} from '../../../src/channels/models/Channel';
import { Action } from '../../helpers/types';
import { updateChannelFactory } from '../../../src/channels/actionCreators/requests/updateChannel';
import {
  channel1server,
  channel1
} from '../../helpers/channels';

describe('Correctly resolves updateChannel: ', () => {
  const updateSuccess = () => Promise.resolve({ json: ((): Promise<IChannelServerModel> => Promise.resolve(channel1server)) });
  const updateFailImmediately = () => Promise.reject(new Error('Channel could not be updated'));
  const updateFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('Channel could not be updated')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeAction = (payload: string): Action => ({ type: 'UNKNOWN', payload });
  const fakeRequest = () => fakeAction('CHANNEL_UPDATE_REQUEST');
  const fakeChannelUpdated = () => fakeAction('CHANNEL_UPDATE_SUCCESS');
  const fakeFailed = () => fakeAction('ERROR');
  const updateChannel = (update: () => Promise<any>) => updateChannelFactory({
    updateBegin: fakeRequest,
    success: fakeChannelUpdated,
    error: fakeFailed,
    update,
  });

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  const testCases = [
    { name: ' succeeding', fetch: updateSuccess },
    { name: ' immediately failing', fetch: updateFailImmediately },
    { name: ' failing', fetch: updateFail },
  ];

  testCases.forEach((testCase) => {
    it('dispatches requestChannels with' + testCase.name + ' fetch', () => {
      updateChannel(testCase.fetch)(channel1.id, channel1.name, channel1.users)(fakeDispatch);
      const actual = fakeDispatch.mock.calls[0];
      expect(actual[0]).toEqual(fakeRequest());
    });
  });

  it('dispatches channelUpdated on success', () => {
    return updateChannel(updateSuccess)(channel1.id, channel1.name, channel1.users)(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeChannelUpdated());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      });
  });

  it('fails with error immediately', () => {
    return updateChannel(updateFailImmediately)(channel1.id, channel1.name, channel1.users)(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      });
  });

  it('fails with error', () => {
    return updateChannel(updateFail)(channel1.id, channel1.name, channel1.users)(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      });
  });
});
