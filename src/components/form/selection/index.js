import React from "react";
import Select from "react-select";
import { Field } from "redux-form";

const Selection = ({ label, name, options, isMulti }) => {
  const SelectComponent = (field) => {
    return (
      <div className="field">
        <label>{label}</label>
        <Select
          {...field.input}
          options={options}
          onChange={(value) => field.input.onChange(value)}
          onBlur={() => field.input.onBlur()}
          value={field.input.value}
          isMulti={isMulti}
        ></Select>
      </div>
    );
  };

  return <Field name={name} component={SelectComponent} />;
};

export default Selection;
