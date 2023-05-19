import React from "react";
import { Employee } from "../../";
import "./style.scss";

const SimpleCard = ({ employee, fetchEmployeeMeetings }) => {
  return (
    <div
      className="employee__simpleCard"
      onClick={() => fetchEmployeeMeetings(employee.id)}
    >
      <div className="segment">
        <Employee.Info employeeId={employee.id} />
      </div>
    </div>
  );
};

export default SimpleCard;
