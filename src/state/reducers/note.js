import { ActionTypes } from "../actions";

const initialState = {
  meetingId: "",
  notes: [],
};

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.CREATE_NOTE:
      return { ...state, ...action.payload };
    case ActionTypes.FETCH_ALL_NOTES:
      return { ...state, notes: action.payload };
    case ActionTypes.SET_MEETING_ID:
      return { ...state, meetingId: action.payload };
    default:
      return state;
  }
};

export default NoteReducer;
