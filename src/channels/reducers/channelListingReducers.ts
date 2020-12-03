import { combineReducers } from 'redux';
import { channelsReducer } from './channelsReducer';
import { channelIdsReducer } from './channelIdsReducer';
import { selectedChannelReducer } from './selectedChannelReducer';

export const channelListingReducers = combineReducers({
  channels: channelsReducer,
  channelIds: channelIdsReducer,
  selectedChannel: selectedChannelReducer,
});
