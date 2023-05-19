import React from "react";
import { reduxForm } from "redux-form";

import { Button } from "../";
import { PROFILE_SURVEY } from "../../constants";
import { PreferenceComponents } from "./questions";

const Peeves = (props) => {
  const { handleSubmit, previousPage } = props;
  return (
    <form onSubmit={handleSubmit} className="ui large form">
      <PreferenceComponents
        label="Any pet peeves you want people to be aware of? "
        rows="5"
        name="petPeevesText"
      />
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
})(Peeves);
