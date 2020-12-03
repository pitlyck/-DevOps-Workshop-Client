import * as Immutable from 'immutable';
import {
  IMessage,
  IMessageServerModel,
  Message,
  MessageServerModel
} from '../models/Message';
import { MessagePopularity } from '../models/MessagePopularity';

export const convertServerToViewMessageModel = (serverModel: IMessageServerModel): IMessage => {
  const { value, createdAt, id, customData: { authorId, annotatedUsers, popularity: { likes, dislikes } } } = serverModel;
  const timestamp = Date.parse(createdAt);
  const ensuredAnnotatedUsers = annotatedUsers ? Immutable.Set<Uuid>(annotatedUsers) : Immutable.Set<Uuid>();
  const messagePopularity = new MessagePopularity({
    likes: Immutable.Set(likes),
    dislikes: Immutable.Set(dislikes)
  });
  return (new Message({
    id,
    text: JSON.parse(value),
    timestamp,
    authorId,
    channelId: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    popularity: messagePopularity,
    annotatedUsers: ensuredAnnotatedUsers,
  }));
};

export const convertViewToServerMessageModel = (clientModel: Partial<IMessage>): IMessageServerModel => {
  const { text, popularity, id, authorId, annotatedUsers } = clientModel;
  return (new MessageServerModel({
    value: JSON.stringify(text),
    customData: {
      popularity,
      authorId,
      clientId: id,
      annotatedUsers,
    }
  }));
};
