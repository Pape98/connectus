import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import Actions from "../actions";
import { Employee } from "../../..";
import { meetingActions } from "../../../../state/actions";
import { ROUTES } from "../../../../constants";
import { formatTime } from "../../../../utils";
import "./style.scss";

const Placeholder = () => {
  return (
    <div className="segment" id="placeholder-meetingDetails">
      <div className="ui fluid placeholder">
        <div className="paragraph">
          <div className="full line"></div>
          <div className="full line"></div>
          <div className="full line"></div>
        </div>
      </div>
    </div>
  );
};

const MeetingDetails = ({ meeting, setCurrentMeeting }) => {
  const { id, meeting_date, title, recipient_id, created_by } = meeting;
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const meetingLink = `${ROUTES.CLIENT.MEETINGS}/${id}`;
  const time = formatTime(meeting_date);

  const currentUserId = useSelector((state) => state.user.profile.id);

  const userToFetch =
    currentUserId === recipient_id ? created_by : recipient_id;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [meeting]);

  const onClickHandler = () => {
    setCurrentMeeting(meeting);
    history.push(meetingLink);
  };

  if (!isLoading) {
    return (
      <div className="segment meeting" id="meeting-segment">
        <div className="meeting__item meeting__time" onClick={onClickHandler}>
          <div>
            <i className="clock outline icon"></i>
            {time}
          </div>
        </div>
        <div className="meeting__employee" onClick={onClickHandler}>
          <Employee.Info className="meeting__item" employeeId={userToFetch} />
        </div>
        <div className="meeting__item meeting__title" onClick={onClickHandler}>
          <div className="ui  label">{title}</div>
        </div>
        <Actions meetingId={id} />
      </div>
    );
  } else {
    return <Placeholder />;
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentMeeting: (meeting) => {
      dispatch(meetingActions.setCurrentMeeting(meeting));
    },
  };
};

export default connect(null, mapDispatchToProps)(MeetingDetails);
