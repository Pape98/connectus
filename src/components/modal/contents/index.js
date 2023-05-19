import React from "react";
import Confirm from "./confirm";
import NewMeeting from "./newMeeting";
import Survey from "./survey";
import Profile from "./profile";

const Contents = ({ children }) => {
  return <>{children}</>;
};

Contents.Confirm = Confirm;
Contents.NewMeeting = NewMeeting;
Contents.Survey = Survey;
Contents.Profile = Profile;

export default Contents;
