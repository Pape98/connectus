import React, { useState, useEffect } from "react";
import dayjs from "dayjs";

import ProfileMenu from "./profileMenu";
import { formatDate } from "../../../utils";
import "./style.scss";

const Topbar = () => {
  const today = formatDate("ddd, MMM D");
  const initialTime = dayjs().format("h:mm A");
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs().format("h:mm A")), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="topbar">
      <div className="topbar__container">
        <div className="topbar__items">
          <div className="topbar__item topbar__date">
            <time>
              {" "}
              <i className="calendar icon outline"></i>
              {today}
            </time>

            <time>
              {" "}
              <i className="icon clock outline"></i>
              {time}
            </time>
          </div>
        </div>
        <div className="topbar__items">
          <div className="topbar__item"></div>
          {/* <div className="topbar__item">
            <i className="bell outline large icon "></i>
          </div> */}
          <div className="topbar__item item__profile">
            <ProfileMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
