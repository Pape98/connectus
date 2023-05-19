import { connect } from "react-redux";

import { meetingActions, employeeActions } from "../../state/actions";
import History from "./component";

const mapStateToProps = (state) => {
  const {
    employee: all,
    meeting,
    user: {
      profile: { id },
    },
    user: { profile },
  } = state;
  return { employees: all, meetings: meeting.all, managerId: id, profile };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllMeetings: (employeeId) => {
      dispatch(meetingActions.fetchAllMeetings(employeeId));
    },
    fetchEmployees: (managerId) =>
      dispatch(employeeActions.fetchEmployees(managerId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
