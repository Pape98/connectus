import React from "react";
import { Field } from "redux-form";

const InputComponent = (field) => {
  return (
    <div className="field">
      <label>{field.label}</label>
      <input {...field.input} />
    </div>
  );
};

const Input = ({ label, type, name }) => {
  return (
    <Field name={name} label={label} type={type} component={InputComponent} />
  );
};

export default Input;
