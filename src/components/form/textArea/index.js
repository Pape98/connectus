import React from "react";
import { Field } from "redux-form";

import "./style.scss";

const TextAreaComponent = (field) => {
  return (
    <div className="field">
      <label>{field.label}</label>
      <textarea rows={field.rows} {...field.input} type={field.type}></textarea>
    </div>
  );
};

const TextArea = ({ label, rows, name }) => {
  return (
    <Field
      name={name}
      rows={rows}
      label={label}
      component={TextAreaComponent}
    />
  );
};

export default TextArea;
