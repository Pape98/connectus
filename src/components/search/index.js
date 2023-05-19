import React from "react";
import { useIsManager } from "../../hooks";
import "./style.scss";

const Search = () => {
  const isManager = useIsManager();
  if (!isManager) return null;
  return (
    <div className="searchbox" id="searchbox">
      <div className="ui fluid icon input">
        <input type="text" placeholder="Search..." />
        <i className="search icon"></i>
      </div>
    </div>
  );
};

export default Search;
