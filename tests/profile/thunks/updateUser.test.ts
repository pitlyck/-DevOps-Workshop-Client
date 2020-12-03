import * as Immutable from 'immutable';
import {
  IUser,
  IUserData,
  User
} from '../../../src/profile/models/User';
import {
  Action,
  Uuid
} from '../../helpers/types';
import {
  firstUserAvatarPath,
  firstUserEmail,
  firstUserId,
  firstUserName
} from '../../helpers/users';
import { Dispatch } from 'redux';
import { updateUserFactory } from '../../../src/profile/actionCreators/requests/updateUser';
import { IState } from '../../../src/shared/models/IState';

describe('Correctly resolves updateUser: ', () => {
  const user = new User({
    id: firstUserId,
    email: firstUserEmail,
    name: firstUserName,
    avatarPath: firstUserAvatarPath,
  });
  const updateSuccess = () => Promise.resolve({ json: (): Promise<Partial<IUserData>> => Promise.resolve(user) });
  const updateFailImmediately = () => Promise.reject(new Error('User could not be updated'));
  const updateFail = () => Promise.resolve({ json: (): Promise<Error> => Promise.reject(new Error('User could not be updated')) });
  let fakeDispatch: jest.Mock<Dispatch>;
  const fakeAction = (payload: string): Action => ({ type: 'UNKNOWN', payload });
  const fakeReceived = () => fakeAction('success');
  const fakeFailed = () => fakeAction('error');
  const fakeUpdateAvatar = () => fakeAction('update_avatar');
  const fakeUpdateUsername = () => fakeAction('update_avatar');
  const fakeGetState = (): IState => {
    return {
      usersInfo: {
        currentUserId: firstUserId,
        users: Immutable.Map<Uuid, IUser>({ [firstUserId]: user })
      }
    } as IState;
  };
  const updateUser = (update: () => Promise<any>) => updateUserFactory({
    success: fakeReceived,
    error: fakeFailed,
    updateAvatarPathBegin: fakeUpdateAvatar,
    updateUsernameBegin: fakeUpdateUsername,
    update,
  });
  const updatedName = 'I am updated';
  const updatedPath = 'www.updated.com';

  const testCases = [
    { name: ' succeeding', update: updateSuccess },
    { name: ' immediately failing', update: updateFailImmediately },
    { name: ' failing', update: updateFail },
  ];

  beforeEach((done) => {
    fakeDispatch = jest.fn((action) => action);
    done();
  });

  testCases.forEach(testCase => {

    it(`dispatches update avatarPath and username with ${testCase.name} update`, () => {
      updateUser(testCase.update)({ updatedUsername: updatedName, updatedAvatarPath: updatedPath })(fakeDispatch, fakeGetState);
      const actual = fakeDispatch.mock.calls;

      expect(actual[0][0]).toEqual(fakeUpdateUsername());
      expect(actual[1][0]).toEqual(fakeUpdateAvatar());
    });
  });

  it('dispatches usersReceived', () =>
    updateUser(updateSuccess)({ updatedUsername: updatedName, updatedAvatarPath: updatedPath })(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[2];

        expect(actual[0]).toEqual(fakeReceived());
        expect(fakeDispatch.mock.calls.length).toBe(3);
      })
  );

  it('fails with error immediately', () =>
    updateUser(updateFailImmediately)({ updatedUsername: updatedName, updatedAvatarPath: updatedPath })(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[2];

        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(3);
      })
  );

  it('fails with error', () =>
    updateUser(updateFail)({ updatedUsername: updatedName, updatedAvatarPath: updatedPath })(fakeDispatch, fakeGetState)
      .then(() => {
        const actual = fakeDispatch.mock.calls[2];

        console.log(actual);
        console.log(fakeDispatch.mock.calls);
        expect(actual[0]).toEqual(fakeFailed());
        expect(fakeDispatch.mock.calls.length).toBe(3);
      })
  );
});
