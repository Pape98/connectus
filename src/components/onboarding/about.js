import React, { useEffect, useState } from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";

import { Button } from "../";
import { PROFILE_SURVEY } from "../../constants";
import { AboutComponents } from "./questions";

let About = ({ handleSubmit, users }) => {
  const [usersList, setUsersList] = useState(users);

  useEffect(() => {
    setUsersList(users);
  }, [users]);

  return (
    <form onSubmit={handleSubmit} className="ui large form">
      <AboutComponents users={usersList} />
      <div className="onboarding__buttons">
        <Button.Base classname="baseButton--submit" text="Next" />
      </div>
    </form>
  );
};

const mapStateToProps = (state) => {
  return { users: state.employee.all };
};

About = connect(mapStateToProps, null)(About);

export default reduxForm({
  form: PROFILE_SURVEY,
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(About);
