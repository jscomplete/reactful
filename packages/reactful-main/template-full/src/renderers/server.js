import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import configStore from 'store/config';

import App from 'components/App';

const initialData = {
  appName: 'Reactful',
};

const appStore = configStore(initialData);

export default async function serverRenderer() {
  return Promise.resolve({
    initialData,
    initialMarkup: ReactDOMServer.renderToString(
      <Provider store={appStore}>
        <App />
      </Provider>
    ),
    pageTitle: `Hello ${initialData.appName}`,
  });
}
