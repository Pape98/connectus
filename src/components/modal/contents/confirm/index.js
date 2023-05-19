import React from "react";

import "./style.scss";
const Confirm = ({ text }) => {
  return (
    <div className="confirm">
      <div>
        {" "}
        <i className="question circle huge icon"></i>
      </div>
      <p>{text}</p>
    </div>
  );
};

export default Confirm;
