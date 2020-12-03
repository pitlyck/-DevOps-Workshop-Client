import { Dispatch } from 'redux';
import { IUserServerModel } from '../models/User';


interface ICreateBearerFactoryDependencies {
  readonly postBegin: () => Action;
  readonly success: (json: object, userId: Uuid) => Action;
  readonly error: (id: string, error: Error) => Action;
  readonly postLogin: (email: string) => Promise<Response>;
  readonly idGenerator: () => string;
  readonly fetchUser: (email: string) => Promise<Response>;
}

export const createBearerFactory = (storage: Storage) => (dependencies: ICreateBearerFactoryDependencies) =>
  (email: string): any => (dispatch: Dispatch): Promise<Action> => {
    dispatch(dependencies.postBegin());
    const errorId = dependencies.idGenerator();

    return dependencies.postLogin(email)
      .then(response => response.json())
      .then(object => {
        storage.setItem('user', object.token);
        return dependencies.fetchUser(email)
          .then(response => {
            return response.json();
          })
          .then((user: IUserServerModel) => {
            return dispatch(dependencies.success(object, user.customData.id));
          })
          .catch((error: Error) => {
            console.log(error);
            return dispatch(dependencies.error(errorId + 'user', error));
          });
      })
      .catch((error: Error) => {
        console.log('this error sucks more');
        return dispatch(dependencies.error(errorId, error));
      });
  };
