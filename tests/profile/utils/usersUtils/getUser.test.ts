import * as Immutable from 'immutable';
import { IUser } from '../../../../src/profile/models/User';
import {
  user1,
  user2,
} from '../../../helpers/users';
import { getUser } from '../../../../src/profile/utils/usersUtils';
import { IUsersInfo } from '../../../../src/profile/models/IUsersInfo';
import { Uuid } from '../../../helpers/types';

describe('Gets the correct user', () => {
  const userInfoState = {
    users: Immutable.Map<Uuid, IUser>({ [user1.id]: user1, [user2.id]: user2 }),
  } as IUsersInfo;

  it('returns the correct memoized user if an existing id is received', () => {
    const id = user1.id;

    const firstAttempt = getUser(userInfoState, id);
    const secondAttempt = getUser(userInfoState, id);

    expect(secondAttempt).toBe(firstAttempt);
  });

  it('returns undefined if a nonexistent id is received', () => {
    const id = '98985a7d-96fb-4a8e-889e-508e7c5365e5';

    const actual = getUser(userInfoState, id);

    expect(actual).toBeUndefined();
  });
});
