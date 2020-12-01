require.context('../static/', true);
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import ReactDom from 'react-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { LayoutSelector } from './containers-redux/LayoutSelector.jsx';
import { createHistory } from './utils/createHistory';
import { createStore } from './utils/createStore';

const history = createHistory();
const store = createStore(history);

ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <LayoutSelector />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('app'));
