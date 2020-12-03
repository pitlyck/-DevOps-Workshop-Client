import {
  AUTHENTICATION__REQUEST,
  AUTHENTICATE__SUCCESS,
  AUTHENTICATION__FAILURE,
} from '../../../src/shared/constants/actionTypes';
import { isAuthenticatingReducer } from '../../../src/shared/reducers/isAuthenticatingReducer';

describe('isAuthenticatingReducer correctly changes the isAuthenticating flag', () => {
  it('changes the flag to true if the user is being authenticated', () => {
    const requestAction = { type: AUTHENTICATION__REQUEST };

    const tested = isAuthenticatingReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the flag to false if the user authentication succeeded', () => {
    const requestAction = { type: AUTHENTICATE__SUCCESS };

    const tested = isAuthenticatingReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the flag to false if the user authentication failed', () => {
    const requestAction = { type: AUTHENTICATION__FAILURE };

    const tested = isAuthenticatingReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = isAuthenticatingReducer(true, requestAction);

    expect(tested).toEqual(true);
  });
});
