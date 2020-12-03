import * as React from 'react';
import { Provider } from 'react-redux';
import {
  applyMiddleware,
  createStore,
} from 'redux';
import createBrowserHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducers/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppContainer } from '../containers/AppContainer';
import { Router as Router } from 'react-router-dom';


export const history = createBrowserHistory();

const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  ),
);

export const AppWrapper: React.SFC = () => (
  <Router history={history}>
    <Provider store={store}>
      <div className="full-height">
        <AppContainer/>
      </div>
    </Provider>
  </Router>
);



