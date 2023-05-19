import React, { useState, useEffect } from "react";
import { Employee } from "../../";
import "./style.scss";

const List = ({ employees, fetchEmployeeMeetings }) => {
  const [employeesList, setEmployeesList] = useState([]);

  useEffect(() => {
    const list = employees.all.map((employee) => (
      <Employee.SimpleCard
        key={employee.id}
        employee={employee}
        fetchEmployeeMeetings={fetchEmployeeMeetings}
      />
    ));
    setEmployeesList(list);
  }, [employees]);

  return <div id="employee__list">{employeesList}</div>;
};

export default List;
