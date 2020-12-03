import {
  AUTHENTICATE__SUCCESS,
  AUTHENTICATION__FAILURE,
  AUTHENTICATION__REQUEST
} from '../../../shared/constants/actionTypes';

export const requestBearer = (): Action => ({
  type: AUTHENTICATION__REQUEST,
});

export const succeedToCreateBearer = (json: object, id: Uuid): Action => ({
  type: AUTHENTICATE__SUCCESS,
  payload: {
    bearer: json,
    id,
  }
});

export const failToCreateBearer = (id: string, error: Error): Action => ({
  type: AUTHENTICATION__FAILURE,
  payload: { id, errorMessage: error.message || 'Bearer was not created' },
});
