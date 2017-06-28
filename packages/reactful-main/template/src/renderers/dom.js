import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/App';

ReactDOM.render(
  <App {...window.REACTFUL__INITIAL_DATA} />,
  document.getElementById('root')
);
