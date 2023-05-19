import React from "react";
import "./style.scss";

const Error = () => {
  return (
    <div id="errorScreen">
      <div className="errorScreen__container">
        <i className="bug icon massive"></i>
        <h1>OOPS</h1>
        <p>Well, this is unexpected...</p>
        <p>
          An error has occured. It would help to let us about it as soon you can
          so that we can fix it. Please email <u>papisline2222@gmail.com.</u>
        </p>
      </div>
    </div>
  );
};

export default Error;
