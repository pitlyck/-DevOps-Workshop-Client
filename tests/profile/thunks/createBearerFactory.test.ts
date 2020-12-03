import {
  IUserServerModel,
  UserServerModel
} from '../../../src/profile/models/User';
import { Action } from '../../helpers/types';
import {
  firstUserAvatarPath,
  firstUserEmail,
  firstUserId,
  firstUserName
} from '../../helpers/users';
import { Dispatch } from 'redux';
import { createBearerFactory } from '../../../src/profile/actionCreators/createBearerFactory';

describe('Correctly resolves authenticateUser: ', () => {
  const user = new UserServerModel({
    email: firstUserEmail,
    customData: {
      id: firstUserId,
      avatarPath: firstUserAvatarPath,
      name: firstUserName,
    }
  });
  const bearer = 'eyJhbGciOiJIUzI1In0.2RStRrVd5MH2Wo6Y3h3H5kMCdnppqik4BMNjyhfJeSA';
  const fetchSuccess = () => Promise.resolve({ json: (): Promise<IUserServerModel> => Promise.resolve(user) });
  const fetchFailImmediately = () => Promise.reject(new Error('Users could not be fetched'));
  const fetchFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('Users could not be fetched')) });
  const loginSuccess = () => Promise.resolve({ json: (): Promise<object> => Promise.resolve({ token: bearer }) });
  const loginFailImmediately = () => Promise.reject(new Error('User could not be authenticated'));
  const loginFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('User could not be authenticated')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeAction = (payload: string): Action => ({ type: 'unknown', payload });
  const fakeReceived = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const fakeRequestBearer = () => fakeAction('request bearer');
  const fakeIdGenerator = () => firstUserId;
  const fakeStorage: Storage = {
    getItem(key: string) {
      return key;
    },
    setItem(_key: string, _value: string) {
      return;
    },
    removeItem(_key: string) {
      return;
    },
    clear() {
      return;
    },
    length: 2,
    key(_number: number) {
      return null;
    },
  };

  const authenticateUser = (postLogin: () => Promise<any>, fetchUser: () => Promise<any>) => createBearerFactory(fakeStorage)({
    success: fakeReceived,
    error: fakeFailed,
    postBegin: fakeRequestBearer,
    postLogin,
    idGenerator: fakeIdGenerator,
    fetchUser,
  });
  const fetchCases = [
    { name: ' succeeding fetch', fetch: fetchSuccess },
    { name: ' immediately failing fetch', fetch: fetchFailImmediately },
    { name: ' failing fetch', fetch: fetchFail },
  ];
  const loginCases = [
    { name: ' succeeding login', login: loginSuccess },
    { name: ' immediately failing login', login: loginFailImmediately },
    { name: ' failing login', login: loginFail },
  ];

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  fetchCases.forEach(fetchCase => {
    loginCases.forEach(loginCase => {
      it(`dispatches requestBearer with ${fetchCase.name} and ${loginCase.name}`, () => {
        authenticateUser(fetchCase.fetch, loginCase.login)(firstUserEmail)(fakeDispatch);
        const actual = fakeDispatch.mock.calls[0];

        console.log(actual);
        console.log(fakeDispatch.mock.calls);
        expect(actual[0]).toEqual(fakeRequestBearer());
      });
    });
  });

  it('dispatches succeedToCreateBearer', () =>
    authenticateUser(loginSuccess, fetchSuccess)(firstUserEmail)(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        console.log(actual);
        console.log(fakeDispatch.mock.calls);
        expect(actual[0]).toEqual(fakeReceived());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error immediately because of user login', () =>
    authenticateUser(loginFailImmediately, fetchSuccess)(firstUserEmail)(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        console.log(actual);
        console.log(fakeDispatch.mock.calls);
        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error because of user login', () =>
    authenticateUser(loginFail, fetchSuccess)(firstUserEmail)(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        console.log(actual);
        console.log(fakeDispatch.mock.calls);
        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error immediately because of user fetch', () =>
    authenticateUser(loginSuccess, fetchFailImmediately)(firstUserEmail)(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        console.log(actual);
        console.log(fakeDispatch.mock.calls);
        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error because of user fetch', () =>
    authenticateUser(loginSuccess, fetchFail)(firstUserEmail)(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        console.log(actual);
        console.log(fakeDispatch.mock.calls);
        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );
});
