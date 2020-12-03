import * as Immutable from 'immutable';
import { Dispatch } from 'redux';
import {
  Action,
  Uuid
} from '../../helpers/types';
import {
  Channel,
  IChannelData
} from '../../../src/channels/models/Channel';
import { IState } from '../../../src/shared/models/IState';
import { postChannelFactory } from '../../../src/channels/ActionCreators/requests/postChannel';
import { channelUsers } from '../../helpers/channels';

describe('Correctly resolves postChannel: ', () => {
  const id = '26d50492-9204-4b4f-ab42-3cb63e1f3826';
  const name = '26d50492-9204-4b4f-ab42-3cb63e1f3826';
  const users = channelUsers;
  const channel = new Channel({
    id,
    name,
    users,
  });
  const postSuccess = () => Promise.resolve({ json: (): Promise<Partial<IChannelData>> => Promise.resolve(channel) });
  const postFailImmediately = () => Promise.reject(new Error('Channel could not be posted'));
  const postFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('Channel could not be posted')) });
  const orderSuccess = () => Promise.resolve({ json: (): Promise<Partial<IChannelData>> => Promise.resolve(channel) });
  const orderFailImmediately = () => Promise.reject(new Error('Channel could not be ordered'));
  const orderFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('Channel could not be ordered')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeGetState = (): IState => {
    return {
      channelListing: {
        channelIds: Immutable.Set<Uuid>(id),
      }
    } as IState;
  };
  const fakeAction = (payload: string): Action => ({ type: 'unknown', payload });
  const fakePostSuccess = () => fakeAction('post success');
  const fakePostFailed = () => fakeAction('post error');
  const fakeCreateChannel = () => fakeAction('post request');
  const fakeOrderReceived = () => fakeAction('order success');
  const fakeOrderFailed = () => fakeAction('order error');
  const fakeRequestOrderChannel = () => fakeAction('order request');
  const fakeIdGenerator = () => id;
  const postChannel = (post: () => Promise<any>, updateOrder: () => Promise<any>) => postChannelFactory({
    success: fakePostSuccess,
    error: fakePostFailed,
    postBegin: fakeCreateChannel,
    post,
    idGenerator: fakeIdGenerator,
    updateOrderBegin: fakeRequestOrderChannel,
    updateOrderSuccess: fakeOrderReceived,
    updateOrderError: fakeOrderFailed,
    updateOrder,
  });
  const postCases = [
    { name: ' succeeding post', post: postSuccess },
    { name: ' immediately failing post', post: postFailImmediately },
    { name: ' failing post', post: postFail },
  ];

  const updateOrderCases = [
    { name: ' succeeding update order', order: orderSuccess },
    { name: ' immediately failing update order', order: orderFailImmediately },
    { name: ' failing update order', order: orderFail },
  ];

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  postCases.forEach(postCase => {
    updateOrderCases.forEach(orderCase => {
      it(`dispatches createChannel with ${postCase.name} and ${orderCase.name}`, () => {
        postChannel(postCase.post, orderCase.order)({ name, users })(fakeDispatch, fakeGetState);
        const actual = fakeDispatch.mock.calls[0];

        expect(actual[0]).toEqual(fakeCreateChannel());
      });
    });
  });

  it('dispatches Success', () =>
    postChannel(postSuccess, orderSuccess)({ name, users })(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls;

        expect(actual[1][0]).toEqual(fakePostSuccess());
        expect(actual[3][0]).toEqual(fakeOrderReceived());
        expect(fakeDispatch.mock.calls.length).toBe(4);
      })
  );

  it('fails with error immediately', () =>
    postChannel(postFailImmediately, orderSuccess)({ name, users })(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakePostFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error', () =>
    postChannel(postFail, orderSuccess)({ name, users })(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakePostFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error if fetch channel order fails immediately', () =>
    postChannel(postSuccess, orderFailImmediately)({ name, users })(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[3];

        expect(actual[0]).toEqual(fakeOrderFailed());
        expect(fakeDispatch.mock.calls.length).toBe(4);
      })
  );

  it('fails with error if fetch channel order fails', () =>
    postChannel(postSuccess, orderFail)({ name, users })(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[3];

        expect(actual[0]).toEqual(fakeOrderFailed());
        expect(fakeDispatch.mock.calls.length).toBe(4);
      })
  );
});
