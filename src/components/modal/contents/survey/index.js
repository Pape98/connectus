import React, { useState } from "react";
import { reduxForm } from "redux-form";

import FeedbackLabel from "./feedbackLabel";
import Scheduling from "./scheduling";
import { Employee, Form } from "../../../index";
import "./style.scss";

const LABELS = [
  {
    text: "Very good",
    emoji: "&#128578;",
  },
  {
    text: "Not sure",
    emoji: "&#128528;",
  },
  {
    text: "Not so good...",
    emoji: "&#128543;",
  },
];

let Survey = (props) => {
  const { handleSubmit, meeting } = props;
  const [selectedLabel, setSelectedLabel] = useState("");
  const [showScheduling, setShowScheduling] = useState(false);

  const dateConversion = new Date(meeting.meeting_date);
  const formattedDate = dateConversion.toDateString();
  const formattedTime = dateConversion.toLocaleTimeString([], {
    timeStyle: "short",
  });

  const onCheckBoxChange = (isChecked) => {
    setShowScheduling(isChecked);
  };

  const feedbackLabels = LABELS.map((label, key) => {
    const highlighted =
      selectedLabel === label.text ? "feedback-label--highlighted" : "";
    return (
      <FeedbackLabel
        highlighted={highlighted}
        key={key}
        text={label.text}
        emoji={label.emoji}
        setSelectedLabel={setSelectedLabel}
      />
    );
  });

  return (
    <section id="survey-form">
      <div className="survey__meeting-info">
        <div className="meeting-info__titleDate">
          <div className="meeting-info__title">{meeting.title}</div>
          <div className="meeting-info__date">{`${formattedDate} at ${formattedTime}`}</div>
        </div>
        <Employee.Info employeeId={meeting.recipient_id} />
      </div>
      <form id="surveyForm" className="ui large form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Your feedback</label>
          <div className="survey__reaction">{feedbackLabels}</div>
        </div>
        <Form.TextArea
          label="Your Professional observations"
          placeholder="Type Here"
          name="professionalObservations"
          rows="4"
        />
        <Form.TextArea
          label="Your Personal observations"
          name="personalObservations"
          placeholder="Type Here"
          rows="4"
        />
        <Form.Checkbox
          isInForm={true}
          name="followUp"
          label="Schedule a follow up"
          parentCallback={onCheckBoxChange}
          defaultValue={showScheduling}
          formName="survey"
          fieldName="followUp"
        />

        <Scheduling showScheduling={showScheduling} />
      </form>
    </section>
  );
};

Survey = reduxForm({
  form: "survey",
})(Survey);

export default Survey;
