import React, { useState, useEffect, useRef } from "react";
import { useClickAway } from "react-use";
import "./style.scss";

const EditView = ({
  tag,
  textOutput,
  onTextValueChange,
  handleKeyDown,
  cursorPosition,
  saveNewText,
}) => {
  const ref = useRef(null);
  useClickAway(ref, () => {
    saveNewText();
  });
  const renderTagType = () => {
    if (tag == "textarea") {
      return (
        <textarea
          type="text"
          value={textOutput}
          onChange={(value) => onTextValueChange(value)}
          onKeyDown={handleKeyDown}
          rows="3"
          onFocus={(e) => (e.target.selectionStart = cursorPosition)}
        />
      );
    } else {
      return (
        <input
          type="text"
          value={textOutput}
          onChange={(value) => onTextValueChange(value)}
          onKeyDown={handleKeyDown}
          onFocus={(e) => (e.target.selectionStart = cursorPosition)}
        />
      );
    }
  };
  return (
    <div className="ui form" ref={ref}>
      <span className="ui field">{renderTagType()}</span>
    </div>
  );
};

const Editable = (props) => {
  const {
    text,
    isEditMode,
    fieldName,
    setIsEditMode,
    tag,
    updateText,
    object,
  } = props;
  const [textValue, setTextValue] = useState("");
  const [cursorPosition, setCursorPosition] = useState(0);

  const saveNewText = () => {
    setIsEditMode(false);
    const updatedObject = { ...object, [fieldName]: textValue };
    updateText(updatedObject);
  };

  useEffect(() => {
    setTextValue(text);
  }, [text]);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const onTextValueChange = (e) => {
    setCursorPosition(e.target.selectionStart);
    setTextValue(e.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveNewText();
    }
  };

  const textOutput = textValue === "" ? "" : textValue;

  const NormalView = () => {
    if (textOutput === "")
      return <span className="click-here">Click here to enter text</span>;
    return (
      <span className="text--editable" onClick={handleEdit}>
        {textOutput}
      </span>
    );
  };

  if (isEditMode)
    return (
      <EditView
        tag={tag}
        textOutput={textOutput}
        onTextValueChange={onTextValueChange}
        handleKeyDown={handleKeyDown}
        cursorPosition={cursorPosition}
        setIsEditMode={setIsEditMode}
        saveNewText={saveNewText}
      />
    );
  return <NormalView />;
};

export default Editable;
