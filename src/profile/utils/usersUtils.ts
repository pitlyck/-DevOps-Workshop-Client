import * as memoizee from 'memoizee';
import { IUsersInfo } from '../models/IUsersInfo';

export const harryId = '9bf3232e-01a6-4370-9110-c57bc5233190';
export const sallyId = '4a681417-dcfc-4951-b6b8-cb1db613f975';
export const janeId = 'd6378ee0-df4b-4c28-b57e-2c19b360261f';

const getCurrentUser = (state: IUsersInfo) => {
  const { currentUserId } = state;
  const currentUser = state.users.get(currentUserId);

  return currentUser;
};
const memoizedGetCurrentUser = memoizee(getCurrentUser);
export { memoizedGetCurrentUser as getCurrentUser };

const getUser = (state: IUsersInfo, userId: Uuid) => {
  return state.users.get(userId);
};
const memoizedGetUser = memoizee(getUser);
export { memoizedGetUser as getUser };
