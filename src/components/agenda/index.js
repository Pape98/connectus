import React from "react";

import Section from "./section";
import Data from "./data";

const Agenda = ({ children }) => {
  return <>{children}</>;
};

Agenda.Section = Section;
Agenda.Data = Data;

export default Agenda;
