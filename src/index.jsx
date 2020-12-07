require.context('../public/', true);

// Enables ES7 features such as async/await in *.js/*.jsx code
import 'babel-core/register';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { AppWrapper } from './shared/components/AppWrapper.tsx';
import { setConfig } from './shared/config.ts';

const main = async () => {
  const resp = await fetch('/env/backendurl');
  const url = await resp.text();
  console.log(url);
  setConfig({ url });

  ReactDOM.render(<AppWrapper/>, document.getElementById('app-root'));
};

main();
