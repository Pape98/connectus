import React, { useEffect, useState } from "react";
import { blur, change, Field } from "redux-form";
import { connect } from "react-redux";

import "./style.scss";

const Checkbox = ({
  label,
  name,
  isInForm,
  note,
  setIsHighlighted,
  updateNote,
  parentCallback,
  defaultValue,
  isDisabled,
  formName,
  fieldName,
}) => {
  if (isInForm) note = null;
  if (note === undefined) return null;
  defaultValue = isInForm ? false : defaultValue;
  if (note !== null) defaultValue = note.is_priority;
  const [isChecked, setIsChecked] = useState(defaultValue);

  useEffect(() => {
    if (note !== null && note !== undefined) setIsChecked(note.is_priority);
  }, [note]);

  useEffect(() => {
    if (parentCallback) parentCallback(isChecked);
  }, [isChecked]);

  const onChange = (event) => {
    if (!isInForm) {
      setIsHighlighted(event.target.checked);
      const updatedNote = { ...note, is_priority: event.target.checked };
      updateNote(updatedNote);
    } else {
      blur(formName, fieldName, event.target.checked);
      change(formName, fieldName, event.target.checked);
    }
    setIsChecked(event.target.checked);
  };

  const CheckboxComponent = (field) => {
    return (
      <div className="field">
        <div className="checkbox">
          <input
            checked={isChecked}
            type="checkbox"
            {...field.input}
            onClick={onChange}
          ></input>
          <label>{label}</label>
        </div>
      </div>
    );
  };

  if (isInForm) return <Field name={name} component={CheckboxComponent} />;

  return (
    <input
      className="checkbox"
      checked={isChecked}
      onChange={onChange}
      type="checkbox"
      value={isChecked}
      disabled={isDisabled}
    />
  );
};

const mapDispatchToProps = {
  blur,
  change,
};

export default connect(null, mapDispatchToProps)(Checkbox);
