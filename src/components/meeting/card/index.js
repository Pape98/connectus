import React from "react";
import { connect, useSelector } from "react-redux";

import { meetingActions } from "../../../state/actions";
import { formatDate } from "../../../utils";
import "./style.scss";

const Card = ({ dispatch, meeting }) => {
  const { id, meeting_date, title } = meeting;
  const formattedDate = formatDate("ddd, MMM D, YYYY", meeting_date);
  const selectedMeetingId = useSelector((state) => state.meeting.current.id);
  const selectedClass =
    selectedMeetingId === meeting.id ? "meetingCard--selected" : "";

  const fetchMeeting = () => {
    dispatch(meetingActions.fetchMeeting(id));
  };

  return (
    <div className={`meetingCard ${selectedClass}`} onClick={fetchMeeting}>
      <div className="segment">
        <div className="meetingCard__title">{title}</div>
        <div className="meetingCard__date">
          <div className="date__icon">
            <i className="handshake outline icon"></i>
          </div>
          <div>{formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, null)(Card);
