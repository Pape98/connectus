import React from "react";

// import { Employee } from "../../components";

const Employees = () => {
  // const x = [...Array(50).keys()];

  // const employees = x.map((val, key) => {
  //   return <Employee.SimpleCard key={key} />;
  // });

  return (
    // <div className="employees">
    //   <h1>Employees</h1>
    //   <div className="employees__list">{employees}</div>
    // </div>
    <div className="employees">
      <div className="employees__list"></div>
      <div className="employees__meetings"></div>
      <div className="employees__meeting"></div>
    </div>
  );
};

export default Employees;
