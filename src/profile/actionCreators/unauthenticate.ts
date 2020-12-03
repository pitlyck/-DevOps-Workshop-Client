import { logOut } from './usersActionCreators';
import { clearBearer } from '../../shared/utils/getBearer';

export const unauthenticate = (userId: string): Action => {
  clearBearer();
  return logOut(userId);
};
