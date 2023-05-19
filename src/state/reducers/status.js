import { ActionTypes } from "../actions";

const initialState = {
  message: {},
};

const StatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_MESSAGE:
      return { ...state, message: {} };
    case ActionTypes.SET_MESSAGE:
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

export default StatusReducer;
