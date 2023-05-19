import React from "react";
import { change, Field } from "redux-form";
import { connect } from "react-redux";
import parse from "html-react-parser";

import "./style.scss";

const reaction = {
  "Very good": "happy",
  "Not so good...": "sad",
  "Not sure": "ok",
};

const FeedbackLabel = (props) => {
  const { highlighted, text, setSelectedLabel, change, emoji } = props;
  const onLabelClick = async () => {
    setSelectedLabel(text);
    change("survey", "reaction", reaction[text]);
    console.log(reaction[text]);
  };
  const LabelComponent = () => {
    return (
      <div className={`feedback-label ${highlighted}`} onClick={onLabelClick}>
        <div className="feedback-label__emoji">{parse(emoji)}</div>
        <div className="feedback-label__text">{text}</div>
      </div>
    );
  };
  return <Field name="reaction" component={LabelComponent} />;
};

const mapDispatchToProps = {
  change,
};

export default connect(null, mapDispatchToProps)(FeedbackLabel);
