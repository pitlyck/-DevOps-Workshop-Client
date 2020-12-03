import * as fetch from 'isomorphic-fetch';
import * as uuid from 'uuid';
import {
  BEARER_ROUTE,
  SERVER_ROUTE,
  USERS_ROUTE
} from '../../../shared/constants/routes';
import { checkStatus } from '../../../shared/utils/checkStatus';
import {
  failToCreateBearer,
  requestBearer,
  succeedToCreateBearer
} from './authActionCreators';
import { createBearerFactory } from '../createBearerFactory';
import { getBearer } from '../../../shared/utils/getBearer';

const createBearerFactoryDependencies = {
  postBegin: requestBearer,
  success: succeedToCreateBearer,
  error: failToCreateBearer,
  postLogin: (email: string) => fetch(BEARER_ROUTE, {
    method: 'POST',
    body: JSON.stringify({ email }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      accept: 'application/json',
    },
  })
    .then(response => checkStatus(response)),
  fetchUser: (email: string) => fetch(`${SERVER_ROUTE}${USERS_ROUTE}${email}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: getBearer(),
    },
  })
    .then(response => checkStatus(response)),
  idGenerator: uuid,
};

export const auth = createBearerFactory(localStorage)(createBearerFactoryDependencies);
