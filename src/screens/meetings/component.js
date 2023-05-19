import React, { useEffect, useState } from "react";

import { useIsManager } from "../../hooks";
import { Meeting } from "../../components";
import orderBy from "lodash/orderBy";
import { remove } from "../../utils";
import "./style.scss";

const sortMeeting = (meetings) => {
  return orderBy(meetings, "meeting_date", "asc");
};

const Meetings = (props) => {
  const { meeting, user, fetchAllMeetings } = props;
  const isManager = useIsManager();
  const params = isManager
    ? { active: false }
    : { is_finished_recipient: true };
  const activeMeetings = remove(meeting.all, params);
  const [meetings, setMeetings] = useState(sortMeeting(activeMeetings));

  const userIdToFetch = isManager ? null : user.id;

  useEffect(() => {
    const sortedMeetings = sortMeeting(activeMeetings);
    setMeetings(sortedMeetings);
  }, [meeting]);

  useEffect(() => {
    fetchAllMeetings(userIdToFetch);
  }, [user]);

  return (
    <div id="meetings-container">
      <section className="meetings-screen__header">
        <h1>Meetings</h1>{" "}
      </section>
      <Meeting.List meetings={meetings} />
    </div>
  );
};

export default Meetings;
