import { SET_ALERT, REMOVE_ALERT, TIME_OUT } from './types';
var uuid = require('uuid');

export const setAlert = (msg, alertType, timeout = TIME_OUT) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => {
    dispatch({ type: REMOVE_ALERT, payload: id });
  }, timeout);
};
