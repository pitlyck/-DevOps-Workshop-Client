import * as Immutable from 'immutable';
import { IMessage, IMessageServerModel } from '../models/Message';
import { MESSAGE_CREATE, MESSAGE_DELETE, MESSAGE_DISLIKE, MESSAGE_LIKE, MESSAGES_FETCH__SUCCESS, MESSAGES_POST__SUCCESS } from '../../shared/constants/actionTypes';
import { messageReducer } from './messageReducer';
import { convertServerToViewMessageModel } from '../utils/convertMessageModels';

const initialState = Immutable.OrderedMap<Uuid, IMessage>();

export const messagesReducer = (prevState: Immutable.OrderedMap<Uuid, IMessage> = initialState, action: Action):
  Immutable.OrderedMap<Uuid, IMessage> => {
  switch (action.type) {
    case MESSAGES_FETCH__SUCCESS: {
      const messages = action.payload.messages
        .reverse()
        .map((value: IMessageServerModel) => [value.id, convertServerToViewMessageModel(value)]);

      return Immutable.OrderedMap<Uuid, IMessage>(messages);
    }

    case MESSAGE_CREATE: {
      const newMessage = messageReducer(undefined, action);
      return prevState.set(action.payload.id , newMessage);
    }

    case MESSAGES_POST__SUCCESS: {
      const oldId = action.payload.message.customData.clientId;

      const oldMessage = prevState.get(oldId);
      const updatedMessage = messageReducer(oldMessage, action);

      return prevState
        .mapEntries<string, IMessage>((entry: [string, IMessage]) =>
          (entry[0] === oldId)
            ? [ updatedMessage.id, updatedMessage ]
            : entry)
        .toOrderedMap();
    }

    case MESSAGE_DELETE: {
      return prevState.delete(action.payload.messageId);
    }

    case MESSAGE_DISLIKE:
    case MESSAGE_LIKE: {
      const { messageId } = action.payload;
      const currentMessage = prevState.get(messageId);
      const newMessage = messageReducer(currentMessage, action);
      const newState = prevState.set(messageId, newMessage);

      return newState;
    }

    default:
      return prevState;
  }
};
