import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';

require('../styles/index.scss');

ReactDOM.hydrate(
  <App initialData={window.__R_DATA.initialData} />,
  document.getElementById('root')
);
