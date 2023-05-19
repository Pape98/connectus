import { connect } from "react-redux";

import { meetingActions } from "../../state/actions";
import Meetings from "./component";

const mapStateToProps = (state) => {
  const {
    meeting,
    employee: { selected },
  } = state;
  return { meeting, user: selected };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllMeetings: (userId) => {
      dispatch(meetingActions.fetchAllMeetings(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meetings);
