import * as uuid from 'uuid';
import {
  MESSAGE_DELETE,
  MESSAGE_DISLIKE,
  MESSAGE_LIKE,
  MESSAGES_DELETE__FAILURE,
  MESSAGES_DELETE__SUCCESS,
  MESSAGES_FAKE_RECEIVE__REQUEST,
  MESSAGES_FETCH__FAILURE,
  MESSAGES_FETCH__REQUEST,
  MESSAGES_FETCH__SUCCESS,
  MESSAGES_POST__FAILURE,
  MESSAGES_POST__SUCCESS,
  MESSAGES_UPDATE__FAILURE,
  MESSAGES_UPDATE__SUCCESS,
} from '../../shared/constants/actionTypes';
import { createMessageFactory } from './createMessageFactory';

export const requestMessages = (): Action => ({
  type: MESSAGES_FETCH__REQUEST,
  payload: {},
});

export const fakeReceiveMessages = (): Action => ({
  type: MESSAGES_FAKE_RECEIVE__REQUEST,
  payload: {},
});

export const succeedToFetchMessages = (json: object): Action => ({
  type: MESSAGES_FETCH__SUCCESS,
  payload: { messages: json },
});

export const failToFetchMessages = (id: string, error: Error): Action => ({
  type: MESSAGES_FETCH__FAILURE,
  payload: { id, errorMessage: error.message || 'Messages were not fetched' },
});

export const deleteMessage = (messageId: Uuid): Action => ({
  type: MESSAGE_DELETE,
  payload: {
    messageId,
  }
});

export const succeedToDeleteMessage = (json: object): Action => ({
  type: MESSAGES_DELETE__SUCCESS,
  payload: { messages: json },
});

export const failToDeleteMessage = (id: string, error: Error): Action => ({
  type: MESSAGES_DELETE__FAILURE,
  payload: { id, errorMessage: error.message || 'Message was not deleted' },
});

export const createMessage = createMessageFactory(uuid, Date.now);

export const succeedToPostMessage = (json: object): Action => ({
  type: MESSAGES_POST__SUCCESS,
  payload: { message: json },
});

export const failToPostMessage = (id: string, error: Error): Action => ({
  type: MESSAGES_POST__FAILURE,
  payload: { id, errorMessage: error.message || 'Message was not created' },
});

export const likeMessage = (messageId: Uuid, userId: Uuid): Action => ({
  type: MESSAGE_LIKE,
  payload: {
    messageId,
    userId,
  }
});

export const dislikeMessage = (messageId: Uuid, userId: Uuid): Action => ({
  type: MESSAGE_DISLIKE,
  payload: {
    messageId,
    userId,
  }
});

export const succeedToUpdateMessage = (json: object): Action => ({
  type: MESSAGES_UPDATE__SUCCESS,
  payload: { message: json },
});

export const failToUpdateMessage = (id: string, error: Error): Action => ({
  type: MESSAGES_UPDATE__FAILURE,
  payload: { id, errorMessage: error.message || 'Message was not updated' },
});
