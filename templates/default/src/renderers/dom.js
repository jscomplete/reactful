import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from 'components/App';

import '../styles/index.css';

ReactDOM.hydrate(
  <App initialData={window.__R_DATA.initialData} />,
  document.getElementById('root'),
);
