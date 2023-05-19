import React from "react";
import { Field } from "redux-form";

import "./style.scss";

const PickerComponent = (field) => {
  return (
    <div className="field">
      <label>{field.label}</label>
      <input {...field.input} type={field.type}></input>
    </div>
  );
};

const Picker = ({ label, type, name, min }) => {
  return (
    <Field
      min={min}
      name={name}
      label={label}
      type={type}
      component={PickerComponent}
    />
  );
};

export default Picker;
