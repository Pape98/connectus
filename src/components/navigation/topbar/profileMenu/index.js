import React, { useState, useRef } from "react";
import { useClickAway } from "react-use";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { ROUTES } from "../../../../constants";
import { Button, Employee } from "../../../";
import "./style.scss";

const ProfileMenu = () => {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const employee = useSelector((state) => state.employee.selected);
  const ref = useRef(null);
  const iconClickHandler = () => {
    console.log("lol");
    setOpenProfileMenu(!openProfileMenu);
  };

  useClickAway(ref, () => {
    setOpenProfileMenu(false);
  });

  const profileMenuList = () => {
    const openCloseClass = openProfileMenu ? "visible" : "hidden";
    return (
      <div
        ref={ref}
        className={`profileMenu__container profileMenu--${openCloseClass}`}
      >
        <div id="profileMenu__segment" className="segment">
          <ul className="profileMenu__list">
            <li>{employee.first_name + " " + employee.last_name}</li>{" "}
            <Link
              to={ROUTES.CLIENT.MEETINGS}
              onClick={() => setOpenProfileMenu(false)}
            >
              {" "}
              <li>Meetings</li>
            </Link>
            <Link
              to={ROUTES.CLIENT.HISTORY}
              onClick={() => setOpenProfileMenu(false)}
            >
              {" "}
              <li>History</li>
            </Link>
            <Link
              to={ROUTES.CLIENT.PROFILE}
              onClick={() => setOpenProfileMenu(false)}
            >
              {" "}
              <li>Profile</li>
            </Link>
            <Button.Authentication />
          </ul>
        </div>
      </div>
    );
  };

  return (
    <>
      <Employee.ProfileImage
        onClick={iconClickHandler}
        employee={employee}
      />
      <div className="profileMenu">
        <i className="down angle large icon" onClick={iconClickHandler}></i>
        {profileMenuList()}
      </div>
    </>
  );
};

export default ProfileMenu;
