import { connect } from "react-redux";
import Home from "./component";
import { meetingActions, employeeActions } from "../../state/actions";

const mapStateToProps = (state) => {
  const {
    employee: { selected },
    meeting: { all },
  } = state;
  return { userProfile: selected, meetings: { all } };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllMeetings: (userId) =>
      dispatch(meetingActions.fetchAllMeetings(userId)),
    fetchEmployees: (id) => dispatch(employeeActions.fetchEmployees(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
