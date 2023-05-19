import React from "react";
import classnames from "classnames";
import "./style.scss";

const Base = (props) => {
  const { text, icon, onClickHandler, classname } = props;
  const renderIcon = icon ? <i className={`${icon} large icon`}></i> : <></>;
  return (
    <button
      className={classnames("baseButton ", classname)}
      onClick={onClickHandler}
      type="submit"
    >
      <>{renderIcon}</>
      <div className="baseButton__text">{text}</div>
    </button>
  );
};

export default Base;
