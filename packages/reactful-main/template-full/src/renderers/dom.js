import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from 'store/config';

import App from 'components/App';
if (process.env.NODE_ENV !== 'production') {
  require('../styles/index.scss');
}

const appStore = configStore(window.__R_DATA.initialData);

ReactDOM.hydrate(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
