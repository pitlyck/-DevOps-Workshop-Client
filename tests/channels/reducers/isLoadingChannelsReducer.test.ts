import { isLoadingChannelsReducer } from '../../../src/channels/reducers/isLoadingChannelsReducer';
import {
  CHANNELS_FETCH__REQUEST,
  CHANNELS_ORDER_FETCH__REQUEST,
  CHANNELS_ORDER_FETCH__FAILURE,
  CHANNELS_ORDER_FETCH__SUCCESS
} from '../../../src/shared/constants/actionTypes';

describe('isLoadingChannelsReducer correctly changes the channels loading info', () => {
  it('changes the loading status when requesting channels to true', () => {
    const requestAction = { type: CHANNELS_FETCH__REQUEST };

    const tested = isLoadingChannelsReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the loading status when requesting channel order to true', () => {
    const requestAction = { type: CHANNELS_ORDER_FETCH__REQUEST };

    const tested = isLoadingChannelsReducer(undefined, requestAction);

    expect(tested).toEqual(true);
  });

  it('changes the loading status when channel order is received to false', () => {
    const requestAction = { type: CHANNELS_ORDER_FETCH__SUCCESS };

    const tested = isLoadingChannelsReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('changes the loading status when recieving channel order fails to false', () => {
    const requestAction = { type: CHANNELS_ORDER_FETCH__FAILURE };

    const tested = isLoadingChannelsReducer(true, requestAction);

    expect(tested).toEqual(false);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = isLoadingChannelsReducer(true, requestAction);

    expect(tested).toEqual(true);
  });
});
