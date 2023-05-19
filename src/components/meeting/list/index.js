import React from "react";

import { formatDate } from "../../../utils";
import MeetingDetails from "./meetingDetails";
import { ReactSVG } from "react-svg";
import "./style.scss";

const List = ({ meetings }) => {
  let currentDate = new Date().toDateString();

  const list = meetings.map((meeting, index) => {
    const meetingDate = new Date(meeting.meeting_date).toDateString();
    if (currentDate !== meetingDate || index === 0) {
      currentDate = meetingDate;
      return (
        <section key={meeting.id}>
          <p className="meeting_date">
            {formatDate("ddd, MMM D", meeting.meeting_date)}
          </p>{" "}
          <MeetingDetails meeting={meeting} />{" "}
        </section>
      );
    }
    return <MeetingDetails meeting={meeting} key={meeting.id} />;
  });

  const Placeholder = () => {
    return (
      <div className="segment">
        <div className="placeholder">
          {" "}
          <h2>No meetings found</h2>
          <ReactSVG src="undraw_empty.svg" />
          <div>Click on the plus button to create one.</div>
        </div>
      </div>
    );
  };

  return (
    <div className="segment meetings__list">
      {list.length === 0 && <Placeholder />}
      <div>{list}</div>
    </div>
  );
};

export default List;
