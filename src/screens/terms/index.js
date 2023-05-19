import React from "react";
import { terms } from "./terms";
import { Button } from "../../components";
import "./style.scss";
import { ROUTES } from "../../constants";
import { useHistory } from "react-router-dom";

const Terms = () => {
  const history = useHistory();
  const onClickHandler = () => {
    history.push(ROUTES.CLIENT.ONBOARDING);
  };

  return (
    <div id="terms">
      <menu>
        <img src="logo-white.svg" />
      </menu>
      <div
        id="content"
        className="ui container"
        dangerouslySetInnerHTML={{ __html: terms }}
      ></div>
      <div className="button__container">
        <p>By clicking continue, you agree to our terms and conditions</p>
        <Button.Base
          classname="baseButton--submit"
          text="CONTINUE"
          onClickHandler={onClickHandler}
        />
      </div>
    </div>
  );
};

export default Terms;
