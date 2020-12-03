import { Dispatch } from 'redux';
import * as fetch from 'isomorphic-fetch';
import * as uuid from 'uuid';
import {
  createUser,
  failToPostUser,
  succeedToPostUser
} from '../usersActionCreators';
import {
  SERVER_ROUTE,
  USERS_ROUTE
} from '../../../shared/constants/routes';
import { checkStatus } from '../../../shared/utils/checkStatus';
import { ICreateUserDependencies } from '../createUserFactory';
import {
  IUserData,
  User
} from '../../models/User';
import { convertViewToServerUserModel } from '../../utils/convertUserModels';
import { getBearer } from '../../../shared/utils/getBearer';

const postUserFactoryDependencies = {
  postBegin: createUser,
  success: succeedToPostUser,
  error: failToPostUser,
  post: (body: Partial<IUserData>) => fetch(`${SERVER_ROUTE}${USERS_ROUTE}`, {
    method: 'POST',
    body: JSON.stringify(convertViewToServerUserModel(body)),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      accept: 'application/json',
      authorization: getBearer(),
    },
  })
    .then(response => checkStatus(response)),
  idGenerator: uuid,
};

interface IPostUserFactoryDependencies {
  readonly postBegin: (body: Partial<IUserData>) => Action;
  readonly success: (json: object) => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly post: (body: Partial<IUserData>) => Promise<Response>;
  readonly idGenerator: () => string;
}

export const postUserFactory = (dependencies: IPostUserFactoryDependencies) =>
  (data: ICreateUserDependencies) => (dispatch: Dispatch): Promise<Action> => {
    const { username, email } = data;
    const userId = dispatch(dependencies.postBegin(data)).payload.id;
    const body = new User({ email, name: username, id: userId });

    return dependencies.post(body)
      .then(response => response.json())
      .then(user => dispatch(dependencies.success(user)))
      .catch((error: Error) => dispatch(dependencies.error(userId, error)));
  };

export const postUserRequest = postUserFactory(postUserFactoryDependencies);
