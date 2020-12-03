import {
  IUserData,
  User
} from '../../../src/profile/models/User';
import { Action } from '../../helpers/types';
import {
  firstUserEmail,
  firstUserId,
  firstUserName
} from '../../helpers/users';
import { Dispatch } from 'redux';
import { postUserFactory } from '../../../src/profile/actionCreators/requests/postUser';

describe('Correctly resolves postUser: ', () => {
  const user = new User({
    id: firstUserId,
    email: firstUserEmail,
    name: firstUserName,
  });
  const postSuccess = () => Promise.resolve({ json: (): Promise<Partial<IUserData>> => Promise.resolve(user) });
  const postFailImmediately = () => Promise.reject(new Error('User could not be posted'));
  const postFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('User could not be posted')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeAction = (payload: string): Action => ({ type: 'unknown', payload });
  const fakeReceived = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const fakeAddUser = () => fakeAction('add');
  const fakeIdGenerator = () => firstUserId;
  const postUser = (post: () => Promise<any>) => postUserFactory({
    success: fakeReceived,
    error: fakeFailed,
    postBegin: fakeAddUser,
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
    it(`dispatches createUser with ${testCase.name} post`, () => {
      postUser(testCase.post)({ username: firstUserName, email: firstUserEmail })(fakeDispatch);
      const actual = fakeDispatch.mock.calls[0];

      expect(actual[0]).toEqual(fakeAddUser());
    });
  });

  it('dispatches usersReceived', () =>
    postUser(postSuccess)({ username: firstUserName, email: firstUserEmail })(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeReceived());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error immediately', () =>
    postUser(postFailImmediately)({ username: firstUserName, email: firstUserEmail })(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );

  it('fails with error', () =>
    postUser(postFail)({ username: firstUserName, email: firstUserEmail })(fakeDispatch)
      .then(() => {
        const actual = fakeDispatch.mock.calls[1];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(2);
      })
  );
});
