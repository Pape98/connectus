import React from "react";
import { useGetEmployee } from "../../hooks";

const DataTypes = {
  EMPLOYEES: "EMPLOYEES",
  MEETINGS: "MEETINGS",
};

const BackToEmployeesLink = ({ employeeId, dataType, setDataType }) => {
  const employee = useGetEmployee(employeeId);

  if (dataType === DataTypes.MEETINGS && employee)
    return (
      <div id="employee-list-back">
        <div onClick={() => setDataType(DataTypes.EMPLOYEES)}>
          <i className="left angle icon"></i>
          <div>Employees</div>
        </div>
        <div>{employee.first_name + " " + employee.last_name}</div>
      </div>
    );
  return <></>;
};

export default BackToEmployeesLink;
