import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { statusActions } from "../../state/actions";
import isEmpty from "lodash/isEmpty";
import "./style.scss";

const Message = ({ message, clearMessage }) => {
  const [messageState, setMessageState] = useState("hidden");

  useEffect(() => {
    const state = isEmpty(message) ? "hidden" : "visible";
    setMessageState(state);
  }, [message]);

  return (
    <div className={`message message--${messageState}`}>
      <div className="segment message" id="message-segment">
        <i
          className={`exclamation circle large icon`}
          onClick={() => clearMessage()}
        ></i>
        <div className="message__text">Message sample text</div>
        <i className="close large icon" onClick={clearMessage}></i>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const {
    status: { message },
  } = state;
  return message;
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearMessage: () => {
      dispatch(statusActions.clearMessage);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
