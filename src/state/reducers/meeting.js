import { ActionTypes } from "../actions";

const initialState = {
  all: [],
  current: {},
};

const MeetingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CLEAR_CURRENT_MEETING:
      return { ...state, current: {} };
    case ActionTypes.FETCH_MEETINGS:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_MEETING:
    case ActionTypes.SET_CURRENT_MEETING:
      return { ...state, current: action.payload };
    default:
      return state;
  }
};

export default MeetingReducer;
