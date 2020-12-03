import { Dispatch } from 'redux';
import { auth } from './authenticateRequest';
import { ICreateUserDependencies } from '../createUserFactory';
import { postUserRequest } from './postUser';

const signUpDependencies = {
  postUser: postUserRequest,
  authenticate: auth,
};

interface ISignUpFactoryDependencies {
  readonly postUser: (data: ICreateUserDependencies) => (dispatch: Dispatch) => Promise<Action>;
  readonly authenticate: (email: string) => (dispatch: Dispatch) => Promise<Action>;
}

const signUp = (dependencies: ISignUpFactoryDependencies) =>
  (data: ICreateUserDependencies): any => async (dispatch: Dispatch): Promise<void> => {
    const { email } = data;

    await dependencies.postUser(data)(dispatch);
    await (dependencies.authenticate(email)(dispatch));
  };

export const signUpRequests = signUp(signUpDependencies);
