import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { useClickAway } from "react-use";

import { Modal } from "../../../";
import { meetingActions } from "../../../../state/actions";
import "./style.scss";

const Actions = ({ deleteMeeting, meetingId }) => {
  const [openActions, setOpenActions] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const ref = useRef(null);
  const iconClickHandler = () => {
    setOpenActions(!openActions);
  };

  const deleteHandler = () => {
    deleteMeeting(meetingId);
    setOpenActions(false);
    setShowDeleteModal(false);
  };

  useClickAway(ref, () => {
    setOpenActions(false);
  });

  const actionsList = () => {
    const openCloseClass = openActions ? "visible" : "hidden";
    return (
      <div ref={ref} className={`actions__segment actions--${openCloseClass}`}>
        <div className="segment" id="actions__segment">
          <ul className="actions__list">
            <li className="actions-list__item">ACTION</li>
            <li
              className="actions-list__item"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </li>
          </ul>
        </div>
      </div>
    );
  };
  return (
    <div className="actions">
      <i
        className="ellipsis horizontal  icon actions__button"
        onClick={iconClickHandler}
      ></i>
      {actionsList()}
      <Modal
        show={showDeleteModal}
        title="Delete Meeting"
        OnNegativeButtonClick={() => setShowDeleteModal(false)}
        onPositiveButtonClick={deleteHandler}
        negativeLabel="No"
        positiveLabel="Yes"
      >
        <Modal.Contents.Confirm text="Are you sure you want to delete it?" />
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteMeeting: (meetingId) =>
    dispatch(meetingActions.deleteMeeting(meetingId)),
});

export default connect(null, mapDispatchToProps)(Actions);
