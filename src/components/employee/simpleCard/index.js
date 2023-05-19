import React from "react";
import { Employee } from "../../";
import "./style.scss";

const SimpleCard = ({ employee }) => {
  return (
    <div
      className="employee__simpleCard"
    >
      <div className="segment">
        <Employee.Info employeeId={employee.id} />
      </div>
    </div>
  );
};

export default SimpleCard;
