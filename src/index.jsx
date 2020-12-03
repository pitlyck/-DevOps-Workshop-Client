require.context('../public/', true);

// Enables ES7 features such as async/await in *.js/*.jsx code
import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { AppWrapper } from './shared/components/AppWrapper.tsx';

ReactDOM.render(<AppWrapper/>, document.getElementById('app-root'));
