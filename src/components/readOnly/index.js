import React from "react";
import "./style.scss";
const ReadOnly = ({ children, readOnly }) => {
  if (readOnly) return <span className="readOnly__container">{children}</span>;
  return children;
};

export default ReadOnly;
