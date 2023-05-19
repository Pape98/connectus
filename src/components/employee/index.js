import React from "react";

import SimpleCard from "./simpleCard";
import Info from "./info";
import List from "./list";
import ProfileImage from "./profileImage";

const Employee = ({ children }) => {
  return <>{children}</>;
};

Employee.Info = Info;
Employee.SimpleCard = SimpleCard;
Employee.List = List;
Employee.ProfileImage = ProfileImage;

export default Employee;
