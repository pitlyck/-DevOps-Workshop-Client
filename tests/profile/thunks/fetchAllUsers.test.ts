import { Dispatch } from 'redux';
import {
  IUserServerModel,
  UserServerModel
} from '../../../src/profile/models/User';
import { Action } from '../../helpers/types';
import { fetchAllUsersFactory } from '../../../src/profile/actionCreators/requests/fetchAllUsers';
import {
  firstUserAvatarPath,
  firstUserEmail,
  firstUserId,
  firstUserName,
} from '../../helpers/users';

describe('Correctly resolves fetchUsers: ', () => {
  const secondUserId = '73a4681e-3066-487b-b214-61d7cad0b4aa';
  const users = [
    new UserServerModel({
      email: firstUserEmail,
      customData: {
        id: firstUserId,
        avatarPath: firstUserAvatarPath,
        name: firstUserName,
      }
    }),
    new UserServerModel({
      email: firstUserEmail,
      customData: {
        id: secondUserId,
        avatarPath: firstUserAvatarPath,
        name: firstUserName,
      }
    })
  ];

  const fetchSuccess = () => Promise.resolve({ json: ((): Promise<IUserServerModel[]> => Promise.resolve(users)) });
  const fetchFailImmediately = () => Promise.reject(new Error('Users could not be fetched'));
  const fetchFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('Users could not be fetched')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeAction = (payload: string): Action => ({ type: 'UNKNOWN', payload });
  const fakeRequest = () => fakeAction('request');
  const fakeReceived = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const fakeIdGenerator = () => '98dbde18-639e-49a6-8e51-603ceb2ae92d';
  const testCases = [
    { name: ' succeeding', fetch: fetchSuccess },
    { name: ' immediately failing', fetch: fetchFailImmediately },
    { name: ' failing', fetch: fetchFail },
  ];
  const fetchUsers = (fetch: () => Promise<any>) => fetchAllUsersFactory({
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
    it(`dispatches requestUsers with ${testCase.name} fetch`, () => {
      fetchUsers(testCase.fetch)()(fakeDispatch);
      const actual = fakeDispatch.mock.calls[0];

      expect(actual[0]).toEqual(fakeRequest());
    });
  });

  it('dispatches usersReceived', () =>
    fetchUsers(fetchSuccess)()(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeReceived());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error immediately', () =>
    fetchUsers(fetchFailImmediately)()(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error', () => fetchUsers(fetchFail)()(fakeDispatch)
    .then(() => {
      const actual = fakeDispatch.mock.calls[1];

      expect(actual[0]).toEqual(fakeFailed());
      expect(fakeDispatch.mock.calls.length).toBe(2);
    })
  );
});
