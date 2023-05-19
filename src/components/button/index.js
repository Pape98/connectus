import React from "react";

import Authentication from "./authentication";
import NewMeeting from "./newMeeting";
import Base from "./base";

const Button = ({ children }) => {
  return <>{children}</>;
};

Button.Authentication = Authentication; // Used for displaying login and logout button
Button.NewMeeting = NewMeeting; // Hanging button used for creating new meeting
Button.Base = Base; // Regular submit button

export default Button;
