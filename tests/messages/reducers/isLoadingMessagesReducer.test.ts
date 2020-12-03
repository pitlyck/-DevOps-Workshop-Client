import { isLoadingMessagesReducer } from '../../../src/messages/reducers/isLoadingMessagesReducer';
import {
  MESSAGES_FETCH__FAILURE,
  MESSAGES_FETCH__REQUEST,
  MESSAGES_FETCH__SUCCESS
} from '../../../src/shared/constants/actionTypes';

describe('isLoadingMessagesReducer correctly changes the messages loading info', () => {
  it('changes the loading status when requesting messages to true', () => {
    const requestAction = { type: MESSAGES_FETCH__REQUEST };

    const tested = isLoadingMessagesReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the loading status when messages are received to false', () => {
    const requestAction = { type: MESSAGES_FETCH__SUCCESS };

    const tested = isLoadingMessagesReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the loading status when the fetch of messages failed to false', () => {
    const requestAction = { type: MESSAGES_FETCH__FAILURE };

    const tested = isLoadingMessagesReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = isLoadingMessagesReducer(true, requestAction);

    expect(tested).toEqual(true);
  });
});
