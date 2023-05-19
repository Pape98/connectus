import React from "react";
import { reduxForm } from "redux-form";

import { employeeActions } from "../../state/actions";
import { Button } from "../";
import { PreferenceComponents } from "./questions";
import { PROFILE_SURVEY } from "../../constants";

const Additional = (props) => {
  const { handleSubmit, previousPage } = props;

  return (
    <form onSubmit={handleSubmit} className="ui large form">
      <PreferenceComponents
        label="Any other personal details you’d like to share?"
        rows="5"
        name="personalDetailsText"
      />

      <div className="onboarding__buttons">
        <div className="previousButton" onClick={previousPage}>
          Previous
        </div>
        <Button.Base classname="baseButton--submit" text="Submit" />
      </div>
    </form>
  );
};

const onSubmit = (values, dispatch) => {
  dispatch(employeeActions.createEmployee);
};

export default reduxForm({
  form: PROFILE_SURVEY,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  onSubmit,
})(Additional);
