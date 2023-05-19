import React, { useState } from "react";

import { Modal, Button } from "../../";
import ProfileImage from "../profileImage";
import { formatDate } from "../../../utils";
import { useGetEmployee } from "../../../hooks";
import "./style.scss";

const SummaryProfileCard = ({
  employee,
  showSummary,
  showProfile,
  showProfileHandler,
}) => {
  const showStatusClass = showSummary ? "show" : "hidden";
  if (!employee.interests) return null;
  if (showProfile) return null;
  const interests = employee.interests.split(",").map((interest, key) => {
    return (
      <div key={key} className="ui label">
        {interest}
      </div>
    );
  });
  return (
    <div className={"summaryProfileCard " + showStatusClass}>
      <div className="segment">
        <section className="dates__container">
          <div>
            <div>Start Date</div>
            <div className="text">
              {formatDate("ddd, MMM D", employee.company_start_date)}
            </div>
          </div>
        </section>
        <section>
          <div>Interests</div>
          <div className="interests__container">{interests}</div>
        </section>
        <section>
          <div>Pet Peeves</div>
          <div className="text">{employee.pet_peeves_text}</div>
        </section>
        <section>
          <div>Significant Others</div>
          <div className="text">{employee.significant_others_text}</div>
        </section>
        <section>
          <div>Personal Details</div>
          <div className="text">{employee.personal_details_text}</div>
        </section>
        <Button.Base
          text="Full Profile"
          classname="baseButton--show"
          onClickHandler={showProfileHandler}
        />
      </div>
    </div>
  );
};

const Placeholder = () => {
  return (
    <div className="ui fluid placeholder">
      <div className="image header">
        <div className="medium line"></div>
        <div className="small line"></div>
      </div>
    </div>
  );
};

const Info = (props) => {
  const { employeeId } = props;
  const employee = useGetEmployee(employeeId);
  const [showSummary, setShowSummary] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const showProfileHandler = () => {
    setShowSummary(false);
    setShowProfile(true);
  };

  const onMouseOver = () => {
    if (!window.location.pathname.includes("/meetings/")) return null;
    setShowSummary(true);
  };

  const onMouseOut = () => {
    if (!window.location.pathname.includes("/meetings/")) return null;
    setShowSummary(false);
  };

  if (employee)
    return (
      <section>
        <div
          className="employee-info"
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
        >
          <ProfileImage employee={employee} />
          <div className="employee__detail">
            <div className="employee__name">
              {" "}
              <span></span>
              {employee.first_name + " " + employee.last_name}
            </div>
          </div>
          <SummaryProfileCard
            employee={employee}
            showSummary={showSummary}
            showProfile={showProfile}
            showProfileHandler={showProfileHandler}
          />
        </div>
        <Modal
          show={showProfile}
          title={employee.first_name + " " + employee.last_name}
          OnNegativeButtonClick={() => setShowProfile(false)}
          negativeLabel="Close"
        >
          <Modal.Contents.Profile profile={employee} />
        </Modal>
      </section>
    );

  return <Placeholder />;
};

export default Info;
