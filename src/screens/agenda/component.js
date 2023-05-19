import React, { useState, useEffect } from "react";

import { Employee, Modal, Agenda as MeetingAgenda } from "../../components";
import "./style.scss";
import { useIsManager } from "../../hooks";
import { formatDate, formatTime, isFormValid } from "../../utils";

const Agenda = (props) => {
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const isManager = useIsManager();
  const {
    currentMeeting,
    id: meetingId,
    fetchMeeting,
    createSurvey,
    token,
  } = props;

  const employeeToFetch = isManager
    ? currentMeeting.recipient_id
    : currentMeeting.created_by;

  useEffect(() => {
    fetchMeeting(meetingId);
  }, [token]);

  const closeSurveyModal = () => {
    setShowSurveyModal(false);
    setShowCancelModal(true);
  };

  const onSurveyFormSubmit = async () => {
    try {
      const isValid = await isFormValid("survey");
      if (isValid) {
        setShowSurveyModal(false);
        createSurvey(currentMeeting);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reopenSurveyModal = () => {
    setShowCancelModal(false);
    setShowSurveyModal(true);
  };

  return (
    <div className="agenda">
      <h2>{currentMeeting.title}</h2>
      <section className="agenda__header">
        <div className="header__item header__datetime">
          <Employee.Info employeeId={employeeToFetch} />
          <div>
            <i className="calendar outline icon"></i>
            {formatDate("ddd, MMM D", currentMeeting.meeting_date)}
          </div>
          <div>
            <i className="clock outline icon"></i>
            {formatTime(currentMeeting.meeting_date)}
          </div>
        </div>
        <div className="header__item">
          <button
            className="ui button"
            onClick={() => setShowSurveyModal(true)}
          >
            FINISH MEETING
          </button>
          {/* <i className="ellipsis horizontal large icon options__button"></i> */}
        </div>
      </section>
      <section className="agenda__container">
        <MeetingAgenda.Data currentMeeting={currentMeeting} />
      </section>
      <Modal
        show={showSurveyModal}
        OnNegativeButtonClick={closeSurveyModal}
        onPositiveButtonClick={onSurveyFormSubmit}
        positiveLabel="Submit"
        negativeLabel="Cancel"
        title="Finish Meeting"
      >
        <Modal.Contents.Survey meeting={currentMeeting} readOnly={false} />
      </Modal>
      <Modal
        show={showCancelModal}
        OnNegativeButtonClick={reopenSurveyModal}
        onPositiveButtonClick={() => setShowCancelModal(false)}
        positiveLabel="Yes"
        negativeLabel="No"
        title="Cancel Survey"
      >
        <Modal.Contents.Confirm text="Are you sure you want to cancel?" />
      </Modal>
    </div>
  );
};

export default Agenda;
