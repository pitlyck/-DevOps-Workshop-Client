import {
  user1,
  user2,
} from '../../../helpers/users';
import { getCurrentUser } from '../../../../src/profile/utils/usersUtils';
import { IUsersInfo } from '../../../../src/profile/models/IUsersInfo';
import * as Immutable from 'immutable';
import { Uuid } from '../../../helpers/types';
import { IUser } from '../../../../src/profile/models/User';

describe('Gets the current user', () => {
  it('returns the current memoized user if there is one', () => {
    const userInfoState = {
      users: Immutable.Map<Uuid, IUser>({ [user1.id]: user1, [user2.id]: user2 }),
      currentUserId: user1.id,
    } as IUsersInfo;

    const firstAttempt = getCurrentUser(userInfoState);
    const secondAttempt = getCurrentUser(userInfoState);

    expect(secondAttempt).toBe(firstAttempt);
  });

  it('returns undefined if there is no current user', () => {
    const userInfoStateWithoutCurrentUser = {
      users: Immutable.Map<Uuid, IUser>({ [user1.id]: user1, [user2.id]: user2 }),
      currentUserId: null,
    } as IUsersInfo;

    const actual = getCurrentUser(userInfoStateWithoutCurrentUser);

    expect(actual).toBeUndefined();
  });

  it('returns undefined if there an invalid current user', () => {
    const userInfoStateWithInvalidCurrentUser = {
      users: Immutable.Map<Uuid, IUser>({ [user1.id]: user1 }),
      currentUserId: user2.id,
    } as IUsersInfo;

    const actual = getCurrentUser(userInfoStateWithInvalidCurrentUser);

    expect(actual).toBeUndefined();
  });
});
