import {
  AUTHENTICATE__SUCCESS,
  AUTHENTICATION__FAILURE,
  UNAUTHENTICATE__SUCCESS
} from '../../../src/shared/constants/actionTypes';
import { currentUserReducer } from '../../../src/profile/reducers/currentUserReducer';
import {
  firstUserId,
  user1Id
} from '../../helpers/users';

describe('currentUserReducer correctly changes the current user id', () => {
  it('sets the user id correctly when a user logs in', () => {
    const requestAction = {
      type: AUTHENTICATE__SUCCESS,
      payload: { id: firstUserId }
    };
    const tested = currentUserReducer(null, requestAction);

    expect(tested).toEqual(firstUserId);
  });

  it('sets current user id to null if the authentication fails', () => {
    const requestAction = {
      type: AUTHENTICATION__FAILURE,
    };

    const tested = currentUserReducer(user1Id, requestAction);

    expect(tested).toBeNull();
  });

  it('sets current user id to null when the user log out', () => {
    const requestAction = {
      type: UNAUTHENTICATE__SUCCESS,
      payload: { firstUserId }
    };

    const tested = currentUserReducer(user1Id, requestAction);

    expect(tested).toBeNull();
  });

  it('returns the received state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = currentUserReducer(firstUserId, requestAction);

    expect(tested).toEqual(firstUserId);
  });
});
