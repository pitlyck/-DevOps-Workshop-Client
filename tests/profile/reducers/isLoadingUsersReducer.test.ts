import {
  AUTHENTICATE__SUCCESS,
  USERS_ALL_FETCH__FAILURE,
  USERS_ALL_FETCH__REQUEST,
  USERS_ALL_FETCH__SUCCESS
} from '../../../src/shared/constants/actionTypes';
import { isLoadingUsersReducer } from '../../../src/profile/reducers/isLoadingUsersReducer';

describe('isLoadingUsersReducer correctly changes the users loading info', () => {
  const testCases = [
    {
      name: 'true when requesting users',
      type: AUTHENTICATE__SUCCESS,
      expected: true,
    },
    {
      name: 'true when the authentication succeeded',
      type: USERS_ALL_FETCH__REQUEST,
      expected: true,
    },
    {
      name: 'false when the fetch of users failed',
      type: USERS_ALL_FETCH__FAILURE,
      expected: false,
    },
    {
      name: 'false when users are received',
      type: USERS_ALL_FETCH__SUCCESS,
      expected: false,
    },
  ];

  testCases.forEach(testCase => {
    it(`changes the loading status to ${testCase.name}`, () => {
      const requestAction = { type: testCase.type };

      const tested = isLoadingUsersReducer(!testCase.expected, requestAction);

      expect(tested).toEqual(testCase.expected);
    });
  });

  it('returns the previous state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = isLoadingUsersReducer(true, requestAction);

    expect(tested).toEqual(true);
  });
});
