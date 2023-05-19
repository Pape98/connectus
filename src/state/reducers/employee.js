import { ActionTypes } from "../actions";

const initialState = {
  all: [],
  selected: {},
};

const EmployeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_EMPLOYEES:
      return { ...state, all: action.payload };
    case ActionTypes.FETCH_EMPLOYEE:
      return { ...state, selected: action.payload };
    default:
      return state;
  }
};

export default EmployeeReducer;
