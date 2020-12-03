import {
  AUTHENTICATE__SUCCESS,
  AUTHENTICATION__FAILURE,
  UNAUTHENTICATE__SUCCESS,
} from '../../shared/constants/actionTypes';

const initialState = null;

export const currentUserReducer = (prevState: Uuid | null = initialState, action: Action): Uuid | null => {
  switch (action.type) {
    case AUTHENTICATE__SUCCESS: {
      return action.payload.id;
    }

    case AUTHENTICATION__FAILURE:
    case UNAUTHENTICATE__SUCCESS: {
      return null;
    }

    default:
      return prevState;
  }
};
