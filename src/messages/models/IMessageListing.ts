import * as Immutable from 'immutable';
import {IMessage} from './Message';

export interface IMessageListing {
  readonly messages: Immutable.OrderedMap<Uuid, IMessage>;
}

