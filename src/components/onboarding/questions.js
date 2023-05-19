import React from "react";
import { Form } from "../";
import { INTERESTS } from "../../constants";
import orderBy from "lodash/orderBy";

export const AboutComponents = ({ users }) => {
  if (users) {
    users = users.map((user) => {
      return {
        label: user.first_name + " " + user.last_name,
        value: user.id,
      };
    });

    var sortedUsers = orderBy(users, "label");
    sortedUsers.unshift({ label: "None", value: "none" });
  }

  return (
    <section className="survey__accordion">
      <Form.Picker
        label="When did you start your job at the company"
        type="date"
        name="companyStartDate"
      />
      <Form.Selection
        label="What is the name of your manager. (Select 'None' if you are a manager)"
        name="superiorId"
        options={sortedUsers}
      />
    </section>
  );
};

export const PraiseComponents = () => {
  return (
    <>
      <section className="survey__accordion__options">
        <p>
          Do you like to be praised in public or in private? (Select options)
        </p>
        <Form.Radio.Group>
          <Form.Radio label="Private" name="preferPrivatePraise" value="true" />
          <Form.Radio label="Public" name="preferPrivatePraise" value="false" />
        </Form.Radio.Group>
      </section>
      <Form.TextArea
        label="How do you like to be cared for or cheered up during a tough time?"
        rows="5"
        name="cheerText"
      />
    </>
  );
};

export const SupportComponents = () => {
  return (
    <>
      <section className="survey__accordion__options">
        <p>
          Do you prefer to be supported closely or given space to operate
          independently?
        </p>
        <Form.Radio.Group>
          <Form.Radio
            label="Being supported"
            name="preferSupport"
            value="true"
          />
          <Form.Radio
            label="Being independent"
            name="preferSupport"
            value="false"
          />
        </Form.Radio.Group>
      </section>
    </>
  );
};

export const CommunicationComponents = () => {
  return (
    <>
      <Form.TextArea
        label="What kind of communication do you prefer?"
        rows="5"
        name="communicationPreferenceText"
      />
      <section className="survey__accordion__options">
        <p>
          For virtual meetings – do you prefer audio-only, video-only, or a mix?
          (Select options)
        </p>
        <Form.Radio.Group>
          <Form.Radio
            label="Audio only"
            name="meetingPreference"
            value="audio"
          />
          <Form.Radio
            label="Video only"
            name="meetingPreference"
            value="video"
          />
          <Form.Radio
            label="A mix of the twos"
            name="meetingPreference"
            value="mix"
          />
        </Form.Radio.Group>
      </section>
    </>
  );
};

export const InterestsComponents = () => {
  return (
    <>
      <Form.Selection
        name="interests"
        label="Select your in interests by typing them in the dropdown below."
        options={INTERESTS}
        isMulti={true}
      />
      <p>You can type an interest in the box!</p>
    </>
  );
};

export const PreferenceComponents = ({ label, name, rows }) => {
  return <Form.TextArea label={label} name={name} rows={rows} />;
};
