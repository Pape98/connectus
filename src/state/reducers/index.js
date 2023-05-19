import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";

import EmployeeReducer from "./employee";
import MeetingReducer from "./meeting";
import NoteReducer from "./note";
import NavigationReducer from "./navigation";
import StatusReducer from "./status";
import SurveyReducer from "./survey";
import UserReducer from "./user";

const rootReducer = combineReducers({
  employee: EmployeeReducer,
  form: FormReducer,
  meeting: MeetingReducer,
  navigation: NavigationReducer,
  note: NoteReducer,
  status: StatusReducer,
  survey: SurveyReducer,
  user: UserReducer,
});

export default rootReducer;
