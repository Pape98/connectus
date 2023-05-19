import React from "react";
import { ReactSVG } from "react-svg";
import { useHistory } from "react-router-dom";

import { ROUTES } from "../../constants";
import { Button } from "../../components";
import "./style.scss";

const Message = () => {
  const history = useHistory();

  const onClicker = () => {
    history.push(ROUTES.CLIENT.HOME);
  };

  return (
    <div id="message-container">
      <div className="message">
        {" "}
        <ReactSVG src="logo-white.svg" />
        <h1>Welcome to ConnectUs</h1>
        <p>Congrats on joining the team here at ConnectUs</p>
        <Button.Base text="START" onClickHandler={onClicker} />
      </div>
    </div>
  );
};

export default Message;
