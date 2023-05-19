import { ActionTypes } from "../actions";
import { userService } from "../../services";

export const fetchUserProfile = async (dispatch, getState) => {
  try {
    const {
      user: { graphToken },
    } = getState();
    if (graphToken !== "") {
      const data = await userService.fetchUserProfile();
      dispatch({ type: ActionTypes.FETCH_USER_PROFILE, payload: data });
    }
  } catch (error) {
    //dispatch({ type: ActionTypes.REDIRECT, payload: ROUTES.CLIENT.ERROR });
    console.log(error);
  }
};

export const setAccessToken = (token) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_ACCESS_TOKEN,
      payload: token,
    });
  };
};

export const setIsNewUser = (value) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_IS_NEW_USER,
      payload: value,
    });
  };
};

export const setGraphToken = (token) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_GRAPH_TOKEN,
      payload: token,
    });
  };
};
