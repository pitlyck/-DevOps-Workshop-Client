import { selectedChannelReducer } from '../../../src/channels/reducers/selectedChannelReducer';
import {
  CHANNEL_SELECT,
  CHANNELS_ORDER_FETCH__SUCCESS,
} from '../../../src/shared/constants/actionTypes';
import {
  channel1,
  channel2
} from '../../helpers/channels';

describe('selectedChannelReducer correctly changes the selected channel info', () => {
  it('updates correctly when user selects a channel', () => {
    const { id } = channel1;

    const requestAction = {
      type: CHANNEL_SELECT,
      payload: {
        id,
      }
    };
    const tested = selectedChannelReducer(undefined, requestAction);

    expect(tested).toEqual(id);
  });

  it('selects first channel when initial loading o channels from server is finished', () => {
    const requestAction = {
      type: CHANNELS_ORDER_FETCH__SUCCESS,
      payload: {
        channelIds: [channel1.id, channel2.id]
      }
    };

    const tested = selectedChannelReducer(undefined, requestAction);

    expect(tested).toEqual(channel1.id);
  });

  it('returns the given state for an unknown action', () => {
    const requestAction = { type: 'UNKNOWN_ACTION' };

    const tested = selectedChannelReducer(true, requestAction);

    expect(tested).toEqual(true);
  });
});
