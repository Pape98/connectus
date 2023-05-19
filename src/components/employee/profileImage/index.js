import React from "react";

import "./style.scss";
const ProfileImage = ({ employee, onClick }) => {
  if (employee.first_name === undefined || employee.error !== undefined)
    return null;
  let name = employee.first_name[0] + employee.last_name[0];
  if (employee?.first_name?.includes("undefined")) name = "";
  return (
    <div onClick={onClick} className="employee__image">
      {name}
    </div>
  );
};

export default ProfileImage;
