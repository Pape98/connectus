import React from "react";
import { reduxForm } from "redux-form";

import { Button } from "../";
import { PROFILE_SURVEY } from "../../constants";
import { SupportComponents } from "./questions";

const Support = ({ handleSubmit, previousPage }) => {
  return (
    <form onSubmit={handleSubmit} className="ui large form">
      <SupportComponents />
      <div className="onboarding__buttons">
        <div className="previousButton" onClick={previousPage}>
          Previous
        </div>
        <Button.Base classname="baseButton--submit" text="Next" />
      </div>
    </form>
  );
};

export default reduxForm({
  form: PROFILE_SURVEY,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(Support);
