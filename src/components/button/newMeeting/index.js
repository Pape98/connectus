import React from "react";
import ReactTooltip from "react-tooltip";

import "./style.scss";

const NewMeetingButton = ({ setShowModal }) => {
  const Button = () => {
    return (
      <>
        <ReactTooltip />
        <span
          id="new-meeting-button"
          onClick={() => setShowModal(true)}
          data-tip="New Meeting"
        >
          <i className="plus inverted icon" />
        </span>
      </>
    );
  };

  return <Button />;
};

export default NewMeetingButton;
