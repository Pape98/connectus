import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";

import { useIsManager } from "../../../hooks";
import { Button, Modal, Redirect } from "../..";
import { meetingActions, employeeActions } from "../../../state/actions";
import { isFormValid } from "../../../utils";

let CreateNew = (props) => {
  const { createMeeting, fetchEmployees, user } = props;
  const [showNewMeetingModal, setShowNewMeetingModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const modalRef = useRef(null);
  const isManager = useIsManager();

  useEffect(() => {
    if (user.superior_id === null) fetchEmployees(user.id);
  });

  const closeNewMeetingModal = () => {
    setShowNewMeetingModal(false);
    setShowCancelModal(true);
  };

  const reopenNewMeetingModal = () => {
    setShowNewMeetingModal(true);
    setShowCancelModal(false);
  };

  const createNewMeeting = async () => {
    try {
      const isValid = await isFormValid("newMeeting", isManager);
      if (isValid) {
        await createMeeting();
        setShowNewMeetingModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Redirect>
      <Button.NewMeeting setShowModal={setShowNewMeetingModal} />
      <Modal
        show={showNewMeetingModal}
        title="New Meeting"
        OnNegativeButtonClick={closeNewMeetingModal}
        onPositiveButtonClick={createNewMeeting}
        negativeLabel="Cancel"
        positiveLabel="Submit"
        modalRef={modalRef}
      >
        <Modal.Contents.NewMeeting />
      </Modal>
      <div></div>
      <Modal
        show={showCancelModal}
        title="Cancel Meeting"
        OnNegativeButtonClick={reopenNewMeetingModal}
        onPositiveButtonClick={() => setShowCancelModal(false)}
        negativeLabel="No"
        positiveLabel="Yes"
      >
        <Modal.Contents.Confirm text="Are you sure you want to exit this new meeting?" />
      </Modal>
    </Redirect>
  );
};

const mapStateToProps = (state) => {
  const {
    meeting: { current },
    employee: { selected },
  } = state;

  return { newMeeting: current, user: selected };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createMeeting: () => {
      dispatch(meetingActions.createMeeting);
    },
    fetchEmployees: (managerId) =>
      dispatch(employeeActions.fetchEmployees(managerId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateNew);
