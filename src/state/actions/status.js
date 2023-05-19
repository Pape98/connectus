import { ActionTypes } from ".";

export const clearMessage = () => (dispatch) => {
  dispatch({ type: ActionTypes.CLEAR_MESSAGE, payload: {} });
};

export const setMessage = (message) => async (dispatch) => {
  dispatch({ type: ActionTypes.SET_MESSAGE, payload: message });
};
