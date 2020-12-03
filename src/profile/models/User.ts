import { Record } from 'immutable';
import { IUserData } from './User';

export interface IUserData {
  readonly id: Uuid;
  readonly email: string;
  readonly name: string;
  readonly avatarPath: string;
}

export interface IUser extends IUserData, IRecordFunctions<IUserData, IUser> {
}

const recordData: IUserData = {
  id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  email: '',
  name: '',
  avatarPath: '',
};

export class User extends Record(recordData) implements IUser {
  readonly id: Uuid;
  readonly email: string;
  readonly name: string;
  readonly avatarPath: string;

  toObject(): IUserData {
    return super.toObject() as IUserData;
  }

  with(data: Partial<IUserData>): IUser {
    return super.merge(data) as User;
  }
}

export interface IUserServerModel {
  readonly email: string;
  readonly customData: {
    readonly id: Uuid;
    readonly name: string;
    readonly avatarPath: string;
  };
}

const userServerModelData: IUserServerModel = {
  email: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  customData: {
    id: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    name: '',
    avatarPath: '',
  },
};

export class UserServerModel extends Record(userServerModelData) implements IUserServerModel {
  readonly email: string;
  readonly customData: {
    readonly id: Uuid;
    readonly name: string;
    readonly avatarPath: string;
  };
}
