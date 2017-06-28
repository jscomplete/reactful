import ajax from './ajax';
import types from './types';

export const errorMessage = (message = 'Something went wrong') => ({
  type: types.SET_ERROR_MESSAGE,
  message,
});

export const syncAction = () => ({
  type: types.SYNC_ACTION,
  message: 'Sync Action Test',
});

export const asyncAction = () => {
  return (dispatch) => {
    ajax
      .fetchTest()
      .then((data) => {
        dispatch({
          type: types.ASYNC_ACTION,
          message: data.get('message'),
        });
      })
      .catch((err) => dispatch(errorMessage(err.message)));
  };
};
