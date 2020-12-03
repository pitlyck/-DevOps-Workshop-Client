import { IUser, IUserServerModel, User, UserServerModel } from '../models/User';

export const convertServerToViewUserModel = (serverModel: IUserServerModel): IUser => {
  const { email, customData: { id, avatarPath, name } } = serverModel;

  return (new User({
    id,
    email,
    name,
    avatarPath,
  }));
};

export const convertViewToServerUserModel = (clientModel: Partial<IUser>): IUserServerModel => {
  const { id, email, name, avatarPath } = clientModel;
  return (new UserServerModel({
    email,
    customData: {
      id,
      name,
      avatarPath,
    }
  }));
};
