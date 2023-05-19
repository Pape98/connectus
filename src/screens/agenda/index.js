import Agenda from "./component";
import { connect } from "react-redux";

import { meetingActions, surveyActions } from "../../state/actions";

const mapStateToProps = (state) => {
  const {
    meeting: { current: currentMeeting },
    user: { accessToken },
  } = state;
  return { currentMeeting, token: accessToken };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createSurvey: (meeting) => {
      dispatch(surveyActions.createSurvey(meeting));
    },
    fetchMeeting: (meetingId) => {
      dispatch(meetingActions.fetchMeeting(meetingId));
    },
    updateMeeting: (updatedMeeting) => {
      dispatch(meetingActions.updateMeeting(updatedMeeting));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Agenda);
