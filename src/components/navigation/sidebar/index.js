/* eslint-disable no-undef */
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { useDispatch } from "react-redux";

import { meetingActions } from "../../../state/actions";
import { ROUTES } from "../../../constants";
import "./style.scss";

const sidebarData = [
  {
    title: "Home",
    icon: "home",
    link: ROUTES.CLIENT.HOME,
  },
  {
    title: "Meetings",
    icon: "meetings",
    link: ROUTES.CLIENT.MEETINGS,
  },
  {
    title: "History",
    icon: "history",
    link: ROUTES.CLIENT.HISTORY,
  },
  {
    title: "Profile",
    icon: "profile",
    link: ROUTES.CLIENT.PROFILE,
  },
];

const Sidebar = () => {
  const location = useLocation().pathname;
  const dispatch = useDispatch();
  const onClick = (event) => {
    if (typeof event.target.className === "object") return;
    if (event.target.className.includes("history")) {
      dispatch(meetingActions.clearCurrentMeeting());
    }
  };
  const content = sidebarData.map((val, key) => {
    const src = "menuIcons/" + val.icon + ".svg";
    return (
      <Link to={val.link} key={key}>
        <li
          className={`list__item ${val.icon}`}
          id={location === val.link ? "list__item--active" : ""}
          onClick={onClick}
        >
          <ReactSVG className="item__icon" src={src} />
          <div className={`item__title ${val.icon}`} onClick={onClick}>
            {val.title}
          </div>
        </li>
      </Link>
    );
  });

  return (
    <div className="sidebar">
      <div className="sidebar__title">
        <img src="/logo.png"></img>
      </div>
      <ul className="sidebar__list">{content}</ul>
    </div>
  );
};

export default Sidebar;
