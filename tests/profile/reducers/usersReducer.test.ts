import * as Immutable from 'immutable';
import {
  IUser,
  User
} from '../../../src/profile/models/User';
import {
  firstUserAvatarPath,
  firstUserEmail,
  firstUserId,
  firstUserName
} from '../../helpers/users';
import { Uuid } from '../../helpers/types';
import { createUserFactory } from '../../../src/profile/actionCreators/createUserFactory';
import { usersReducer } from '../../../src/profile/reducers/usersReducer';
import {
  changeAvatar,
  saveChangesToUsername,
  succeedToFetchAllUsers
} from '../../../src/profile/actionCreators/usersActionCreators';

describe('usersReducer works correctly with users', () => {
  const makeClientUser = (id: Uuid) => new User({
    id,
    email: firstUserEmail,
    avatarPath: firstUserAvatarPath,
    name: firstUserName,
  });
  const initialUser = makeClientUser(firstUserId);

  const initialState = Immutable.Map<Uuid, IUser>({ [firstUserId]: initialUser });

  it('adds a new user correctly', () => {
    const user = new User({
      id: firstUserId,
      email: firstUserEmail,
      name: firstUserName,
    });
    const expected = Immutable.Map<Uuid, User>({ [firstUserId]: user });
    const fakeIdGenerator = () => firstUserId;
    const creationAction = createUserFactory(fakeIdGenerator)({
      email: firstUserEmail,
      username: firstUserName,
    });

    const tested = usersReducer(undefined, creationAction);

    expect(tested).toEqual(expected);
  });

  it('return the users received from the server', () => {
    const firstId = 'f7d23d64-d131-4be9-9f2d-e8568104388b';
    const secondId = '8727f029-40de-44a9-ba42-752e0e558f96';
    const expectedState = Immutable.Map<Uuid, IUser>({
      [firstId]: makeClientUser(firstId),
      [secondId]: makeClientUser(secondId),
    });
    const successAction = succeedToFetchAllUsers(expectedState);
    console.log(successAction);
    console.log(successAction.payload.users);
    console.log(usersReducer(undefined, successAction));
    console.log(expectedState);

    const tested = usersReducer(undefined, successAction);

    expect(tested).toEqual(expectedState);
  });

  it('edits a user correctly - avatar', () => {
    const newPath = 'https://www.newAvatartPath.com';
    const expectedUser = new User({
      id: firstUserId,
      email: firstUserEmail,
      avatarPath: newPath,
      name: firstUserName,
    });
    const expected = Immutable.Map<Uuid, IUser>({ [firstUserId]: expectedUser });
    const editAction = changeAvatar(firstUserId, newPath);

    const tested = usersReducer(initialState, editAction);

    expect(tested).toEqual(expected);
  });

  it('edits a user correctly - name', () => {
    const newName = 'newName';
    const expectedUser = new User({
      id: firstUserId,
      email: firstUserEmail,
      avatarPath: firstUserAvatarPath,
      name: newName,
    });
    const expected = Immutable.Map<Uuid, IUser>({ [firstUserId]: expectedUser });
    const editAction = saveChangesToUsername(firstUserId, newName);

    const tested = usersReducer(initialState, editAction);

    expect(tested).toEqual(expected);
  });

  it('does nothing if an unknown action is received', () => {
    const unknownAction = { type: 'UNKNOWN_TYPE' };

    const tested = usersReducer(initialState, unknownAction);

    expect(tested).toEqual(initialState);
  });
});
