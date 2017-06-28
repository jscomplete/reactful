import types from './types';

module.exports = (state, action) => {
  switch (action.type) {
    case types.SET_ERROR_MESSAGE:
      return state.set('currentError', action.message);
    case types.SYNC_ACTION:
    case types.ASYNC_ACTION:
      return state.withMutations((ctx) =>
        ctx.set('message', action.message).set('currentError', null)
      );
    default:
      return state;
  }
};
