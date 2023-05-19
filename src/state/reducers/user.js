import { ActionTypes } from "../actions";

const initialState = {
  isNewUser: null,
  hasDonOnboarding: null,
  profile: {},
  accessToken: "",
  graphToken: "",
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_IS_NEW_USER: {
      const newState = { ...state, isNewUser: action.payload };
      return newState;
    }
    case ActionTypes.SET_HAS_DONE_ONBOARDING: {
      const newState = { ...state, isNewUser: action.payload };
      return newState;
    }
    case ActionTypes.FETCH_USER_PROFILE:
      return { ...state, profile: action.payload };
    case ActionTypes.SET_ACCESS_TOKEN:
      return { ...state, accessToken: action.payload };
    case ActionTypes.SET_GRAPH_TOKEN:
      return { ...state, graphToken: action.payload };
    default:
      return state;
  }
};

export default UserReducer;
