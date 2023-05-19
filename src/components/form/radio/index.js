import React from "react";
import { Field } from "redux-form";

import "./style.scss";

const Group = ({ children }) => {
  return <div className="radio-group">{children}</div>;
};

const Radio = ({ label, name, value }) => {
  const RadioComponent = (field) => {
    return (
      <div className="field">
        <div className="ui radio checkbox">
          <input {...field.input} type="radio" />
          <label>{label}</label>
        </div>
      </div>
    );
  };

  return (
    <Field type="radio" name={name} value={value} component={RadioComponent} />
  );
};

Radio.Group = Group;

export default Radio;
