import { ActionTypes } from "../actions";

export const redirect = (link) => (dispatch) => {
  dispatch({ type: ActionTypes.REDIRECT, payload: link });
};

export const setRedirectText = (text) => (dispatch) => {
  dispatch({ type: ActionTypes.SET_REDIRECT_TEXT, payload: text });
};

export const clearRedirect = (dispatch) => {
  dispatch({ type: ActionTypes.CLEAR_REDIRECT, payload: "" });
};
