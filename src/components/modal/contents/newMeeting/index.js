import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { useIsManager } from "../../../../hooks";
import { Form } from "../../../";
import "./style.scss";

const titles = [
  {
    label: "General Check-In",
    value: "General Check-In",
  },
  {
    label: "Performance Pulse Check",
    value: "Performance Pulse Check",
  },
];

let NewMeeting = (props) => {
  const { handleSubmit, employees } = props;
  const minDate = new Date().toISOString().split("T")[0];
  const isManager = useIsManager();

  const options = employees.all.map((employee) => {
    return {
      value: { employee: employee.id },
      label: employee.first_name + " " + employee.last_name,
    };
  });

  return (
    <form
      id="new-meeting-form"
      className="ui large form"
      onSubmit={handleSubmit}
    >
      <Form.Selection name="title" type="text" label="TITLE" options={titles} />
      {isManager && (
        <Form.Selection
          options={options}
          name="employee"
          label="INVITE AN EMPLOYEE"
        />
      )}

      <Form.Picker
        name="date"
        type="date"
        label="SELECT A DATE"
        min={minDate}
      />
      <Form.Picker name="time" type="time" label="SELECT A TIME" />
    </form>
  );
};

NewMeeting = reduxForm({
  form: "newMeeting",
})(NewMeeting);

const mapStateToProps = (state) => {
  const { employee } = state;
  return { employees: employee };
};

export default connect(mapStateToProps, null)(NewMeeting);
