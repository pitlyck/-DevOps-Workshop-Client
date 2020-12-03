import { User } from '../../../src/profile/models/User';
import {
  firstUserAvatarPath,
  firstUserEmail,
  firstUserId,
  firstUserName
} from '../../helpers/users';
import { createUserFactory } from '../../../src/profile/actionCreators/createUserFactory';
import { userReducer } from '../../../src/profile/reducers/userReducer';
import {
  changeAvatar,
  saveChangesToUsername
} from '../../../src/profile/actionCreators/usersActionCreators';

describe('userReducer works correctly with a single user', () => {
  const initialUser = new User({
    id: firstUserId,
    email: firstUserEmail,
    avatarPath: firstUserAvatarPath,
    name: firstUserName,
  });

  it('creates a user correctly', () => {
    const fakeIdGenerator = () => firstUserId;
    const expected = new User({
      id: firstUserId,
      email: firstUserEmail,
      name: firstUserName,
    });
    const creationAction = createUserFactory(fakeIdGenerator)({
      email: firstUserEmail,
      username: firstUserName,
    });

    const tested = userReducer(undefined, creationAction);

    expect(tested).toEqual(expected);
  });

  it('updates the avatar of a user', () => {
    const newPath = 'https://newPath.com';
    const expected = new User({
      id: firstUserId,
      email: firstUserEmail,
      avatarPath: newPath,
      name: firstUserName,
    });

    const updateAction = changeAvatar(firstUserId, newPath);

    const tested = userReducer(initialUser, updateAction);

    expect(tested).toEqual(expected);
  });

  it('updates the username of a user', () => {
    const newName = 'newName';
    const expected = new User({
      id: firstUserId,
      email: firstUserEmail,
      avatarPath: firstUserAvatarPath,
      name: newName,
    });

    const updateAction = saveChangesToUsername(firstUserId, newName);

    const tested = userReducer(initialUser, updateAction);

    expect(tested).toEqual(expected);
  });

  it('does nothing with an unknown action', () => {
    const unknownAction = { type: 'UNKNOWN_TYPE' };

    const tested = userReducer(initialUser, unknownAction);

    expect(tested).toEqual(initialUser);
  });
});
