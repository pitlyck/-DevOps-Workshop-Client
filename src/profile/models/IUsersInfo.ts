import * as Immutable from 'immutable';
import {IUser} from './User';

export interface IUsersInfo {
  readonly users: Immutable.Map<Uuid, IUser>;
  readonly currentUserId: Uuid;
}
