import React, { useState, useEffect } from 'react';
import { Employee } from '../../';
import './style.scss';

const List = ({ employees }) => {
  const [employeesList, setEmployeesList] = useState([]);

  useEffect(() => {
    const list = [1, 1, 1, 1, 1].map((employee, i) => (
      <Employee.SimpleCard key={i} employee={employee} />
    ));
    setEmployeesList(list);
  }, [employees]);

  return <div id='employee__list'>{employeesList}</div>;
};

export default List;
