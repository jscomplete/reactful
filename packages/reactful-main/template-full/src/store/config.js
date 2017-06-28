import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';

import mainReducer from './reducers';
import config from 'server/config';

const composeEnhancers =
  (config.isDev &&
    config.isBrowser &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default (initialState) => {
  const store = createStore(
    mainReducer,
    Immutable.fromJS(initialState),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
