import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configStore from 'store/config';

import App from 'components/App';

const appStore = configStore(window.REACTFUL__INITIAL_DATA);

ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);
