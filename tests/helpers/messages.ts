import {
  IMessagePopularity,
  MessagePopularity
} from '../../src/messages/models/MessagePopularity';
import * as Immutable from 'immutable';
import { Uuid } from './types';
import { Message } from '../../src/messages/models/Message';

export const text = '{"blocks":[{"key":"3hovr","text":"One","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}';
export const authorId = '98985a7d-96fb-4a8e-889e-508e7c5365e5';
export const annotatedUsers = Immutable.Set<Uuid>([authorId]);
export const messageId = '1945a888-02f7-4692-9d59-afddbcb49d18';
export const createdAt = '2019-01-02T19:22:25Z';
export const bobId = 'fea7b47c-0a43-45ce-97a3-bda43ce7a1bc';

export const likedByBobPopularity = new MessagePopularity({
  likes: Immutable.Set<Uuid>([bobId]),
  dislikes: Immutable.Set<Uuid>(),
});

export const dislikedByBobPopularity = new MessagePopularity({
  likes: Immutable.Set<Uuid>([]),
  dislikes: Immutable.Set<Uuid>([bobId]),
});

export const popularMessage = (popularity: IMessagePopularity) => new Message({
  authorId,
  timestamp: Date.parse(createdAt),
  id: messageId,
  text: JSON.parse(text),
  popularity,
  annotatedUsers,
});
