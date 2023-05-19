import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

const ReadingSnippet = (props) => {
  const { title, text, link } = props;
  return (
    <div className="segment snippet" id="snippet-segment">
      <h2 className="snippet__header">{title}</h2>
      <p>{text}</p>
      <Link
        to={{ pathname: link }}
        target="_blank"
        className="snippet__read-more"
      >
        <span className="link__text">Read More</span>
        <i className="right angle icon"></i>
      </Link>
    </div>
  );
};

export default ReadingSnippet;
