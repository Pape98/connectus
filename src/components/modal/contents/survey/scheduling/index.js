import React from "react";
import { Form } from "../../../../index";

const Scheduling = ({ showScheduling }) => {
  const showClass = showScheduling ? "visible" : "hidden";
  return (
    <div>
      <div className={`survey__scheduling survey__scheduling--${showClass}`}>
        <div className="two fields">
          <Form.Picker name="meetingDate" label="MEETING DATE" type="date" />
          <Form.Picker name="meetingTime" label="MEETING TIME" type="time" />
        </div>
      </div>
    </div>
  );
};

export default Scheduling;
