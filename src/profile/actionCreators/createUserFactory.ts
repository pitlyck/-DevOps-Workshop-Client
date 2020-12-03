import { USER_CREATE } from '../../shared/constants/actionTypes';

export interface ICreateUserDependencies {
  readonly email: string;
  readonly username: string;
}

export const createUserFactory = (idGenerator: () => Uuid): ((dependencies: ICreateUserDependencies) => Action) =>
  (dependencies: ICreateUserDependencies): Action => ({
    type: USER_CREATE,
    payload: {
      id: idGenerator(),
      email: dependencies.email,
      username: dependencies.username,
    },
  });
