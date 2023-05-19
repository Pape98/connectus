import { ActionTypes } from "../actions";

const initialState = {
  redirectTo: "",
  text: "",
};

const NavigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.REDIRECT:
      return { ...state, redirectTo: action.payload };
    case ActionTypes.SET_REDIRECT_TEXT:
      return { ...state, text: action.payload };
    case ActionTypes.CLEAR_REDIRECT:
      return { ...state, redirectTo: "" };
    case ActionTypes.CLEAR_REDIRECT_TEXT:
      return { ...state, text: "" };
    default:
      return state;
  }
};

export default NavigationReducer;
