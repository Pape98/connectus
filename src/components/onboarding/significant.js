import React from "react";
import { reduxForm } from "redux-form";

import { Button } from "../";
import { PROFILE_SURVEY } from "../../constants";
import { PreferenceComponents } from "./questions";

const Significant = ({ handleSubmit, previousPage }) => {
  return (
    <form onSubmit={handleSubmit} className="ui large form">
      <PreferenceComponents
        label="Any significant people in your life you’d like others to know about and first names?"
        rows="5"
        name="significantOthersText"
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
})(Significant);
