import React from "react";
import isEmpty from "lodash/isEmpty";
import { Agenda } from "../../";
import { useIsManager } from "../../../hooks";
import MeetingSurvey from "./meetingSurvey";
import { Survey } from "../../../constants";
import { Accordion } from "../../";
import "./style.scss";

const Data = (props) => {
  const { currentMeeting, readOnly } = props;
  const isManager = useIsManager();

  if (isEmpty(currentMeeting) && readOnly) {
    return (
      <div id="no-meeting-selected">
        <h2>No meeting selected</h2>
        <div id="image-container">
          <img src="noData-undraw.svg" />
        </div>
        <div>
          {!isManager && <p>Select a meeting in order to see the details</p>}
          {isManager && (
            <p>Select an employee and a meeting in order to see the details</p>
          )}
        </div>
      </div>
    );
  }

  const PostOneOnOne = () => {
    if (!readOnly) return null;
    return (
      <Accordion title="Post 1-1 Notes" icon="history">
        <MeetingSurvey meetingId={currentMeeting.id} surveyType={Survey.NEW} />
      </Accordion>
    );
  };

  return (
    <>
      <Accordion title="Pre 1-1 Notes" icon="history">
        <MeetingSurvey meetingId={currentMeeting.id} surveyType={Survey.OLD} />
      </Accordion>

      <PostOneOnOne />

      <Agenda.Section
        title="Key Points"
        icon="pin"
        meetingId={currentMeeting.id}
        readOnly={readOnly}
      />
    </>
  );
};

export default Data;
