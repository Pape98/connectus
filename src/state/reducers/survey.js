import { ActionTypes } from "../actions";

const initialState = {
  old: {},
  new: {},
};

const SurveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_OLD_SURVEY:
      return { ...state, old: action.payload };
    case ActionTypes.FETCH_NEW_SURVEY:
      return { ...state, new: action.payload };
    default:
      return state;
  }
};

export default SurveyReducer;
