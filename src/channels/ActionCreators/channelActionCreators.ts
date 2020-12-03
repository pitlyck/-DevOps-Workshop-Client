import * as uuid from 'uuid';
import {
  CHANNEL_DELETE, CHANNEL_UPDATE, CHANNEL_SELECT,
  CHANNELS_FETCH__REQUEST, CHANNELS_FETCH__SUCCESS, CHANNELS_FETCH__FAILURE,
  CHANNELS_POST__SUCCESS, CHANNELS_POST__FAILURE,
  CHANNELS_DELETE__SUCCESS, CHANNELS_DELETE__FAILURE, CHANNELS_UPDATE__SUCCESS, CHANNELS_UPDATE__FAILURE,
  CHANNELS_REORDER, CHANNELS_REORDER__SUCCESS, CHANNELS_REORDER__FAILURE, CHANNELS_ORDER_FETCH__REQUEST, CHANNELS_ORDER_FETCH__SUCCESS, CHANNELS_ORDER_FETCH__FAILURE
} from '../../shared/constants/actionTypes';
import { createChannelFactory } from './createChannelFactory';
import * as Immutable from 'immutable';
import { AppData } from '../models/AppData';

// Fetching channels

export const requestChannels = (): Action => ({
  type: CHANNELS_FETCH__REQUEST,
  payload: {},
});

export const succeedToFetchChannels = (json: object): Action => ({
  type: CHANNELS_FETCH__SUCCESS,
  payload: { channels: json },
});

export const failToFetchChannels = (id: string, error: Error): Action => ({
  type: CHANNELS_FETCH__FAILURE,
  payload: { id, errorMessage: error.message || 'Channels were not fetched' },
});

// Posting a channel

export const createChannel = createChannelFactory(uuid);

export const succeedToPostChannel = (json: object): Action => ({
  type: CHANNELS_POST__SUCCESS,
  payload: { channel: json },
});

export const failToPostChannel = (id: string, error: Error): Action => ({
  type: CHANNELS_POST__FAILURE,
  payload: { id, errorMessage: error.message || 'Channel was not created' },
});

// Deleting a channel

export const deleteChannel = (id: Uuid): Action => ({
  type: CHANNEL_DELETE,
  payload: {
    id
  }
});

export const succeedToDeleteChannel = (): Action => ({
  type: CHANNELS_DELETE__SUCCESS,
  payload: {},
});

export const failToDeleteChannel = (id: string, error: Error): Action => ({
  type: CHANNELS_DELETE__FAILURE,
  payload: { id, errorMessage: error.message || 'Channel was not deleted' },
});

// Updating a channel

export const updateChannel = (id: Uuid, name?: string, users?: Immutable.List<Uuid>): Action => ({
  type: CHANNEL_UPDATE,
  payload: {
    id,
    name,
    users,
  }
});

export const succeedToUpdateChannel = (json: object): Action => ({
  type: CHANNELS_UPDATE__SUCCESS,
  payload: { channel: json },
});

export const failToUpdateChannel = (id: string, error: Error): Action => ({
  type: CHANNELS_UPDATE__FAILURE,
  payload: { id, errorMessage: error.message || 'Channel was not updated' },
});

// Reordering channels

export const reorderChannels = (channelIds: Immutable.OrderedSet<Uuid>): Action => ({
  type: CHANNELS_REORDER,
  payload: {
    channelIds
  }
});

export const succeedToReorderChannels = (json: object): Action => ({
  type: CHANNELS_REORDER__SUCCESS,
  payload: {
    appData: json
  },
});

export const failToReorderChannels = (error: Error): Action => ({
  type: CHANNELS_REORDER__FAILURE,
  payload: { errorMessage: error.message || 'Channels were not reordered.' },
});

// Getting channel order

export const requestChannelOrder = (): Action => ({
  type: CHANNELS_ORDER_FETCH__REQUEST,
  payload: {},
});

export const succeedToFetchChannelOrder = (appData: AppData): Action => ({
  type: CHANNELS_ORDER_FETCH__SUCCESS,
  payload: { channelIds: appData.customData.channelsOrder },
});

export const failToFetchChannelOrder = (error: Error): Action => ({
  type: CHANNELS_ORDER_FETCH__FAILURE,
  payload: { errorMessage: error.message || 'Channels order was not fetched' },
});

// Other

export const selectChannel = (id: Uuid): Action => ({
  type: CHANNEL_SELECT,
  payload: {
    id
  }
});

