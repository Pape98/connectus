import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ReactSVG } from "react-svg";

import BackToEmployeesLink from "./BackToEmployeesLink";
import { useIsManager } from "../../hooks";
import { Agenda, Employee, Meeting } from "../../components";
import { formatDate, remove } from "../../utils";
import "./style.scss";

const DataTypes = {
  EMPLOYEES: "EMPLOYEES",
  MEETINGS: "MEETINGS",
};

const MeetingsList = ({ meetings }) => {
  if (meetings.length) {
    const meetingsCardList = meetings.map((meeting) => (
      <Meeting.Card key={meeting.id} meeting={meeting} />
    ));
    return <div id="history__meetingsList">{meetingsCardList}</div>;
  }
  return <NoData text="No past meetings found" />;
};

const NoData = ({ text }) => {
  return (
    <div id="noData">
      <ReactSVG src="undraw_empty.svg" />
      <p>{text}</p>
    </div>
  );
};

const History = (props) => {
  const {
    employees,
    meetings,
    profile,
    fetchAllMeetings,
    fetchEmployees,
    managerId,
  } = props;

  const [dataType, setDataType] = useState(DataTypes.EMPLOYEES);
  const [employeeId, setEmployeeId] = useState(null);

  const isManager = useIsManager();

  const params = isManager
    ? { active: true }
    : { is_finished_recipient: false };

  const pastMeetings = remove(meetings, params);

  useEffect(() => {
    fetchEmployees(managerId);
  }, [profile]);

  useEffect(() => {
    if (isManager === false) {
      fetchAllMeetings(profile.id);
    }
    return () => {
      if (isManager === false) {
        fetchAllMeetings(profile.id);
      }
    };
  }, [profile.id]);

  const selectedMeeting = useSelector((state) => state.meeting.current);
  const date = formatDate("ddd, MMM D, YYYY", selectedMeeting.meeting_date);

  const fetchEmployeeMeetings = async (employeeId) => {
    setDataType(DataTypes.MEETINGS);
    fetchAllMeetings(employeeId);
    setEmployeeId(employeeId);
  };

  const MenuData = () => {
    // Determine what menu to show based on user role
    if (dataType === DataTypes.MEETINGS || isManager === false) {
      return <MeetingsList meetings={pastMeetings} />;
    } else if (dataType === DataTypes.EMPLOYEES) {
      const list = employees.all.length ? (
        <Employee.List
          employees={employees}
          fetchEmployeeMeetings={fetchEmployeeMeetings}
        />
      ) : (
        <NoData text="No Employees" />
      );
      return list;
    }
  };

  const Header = () => {
    if (selectedMeeting.meeting_date) {
      return (
        <div className="history__header">
          <h3>{selectedMeeting.title}</h3>
          <h3>{date}</h3>
        </div>
      );
    }
    return null;
  };

  return (
    <div id="history-container">
      <div id="history-grid">
        <section className="history__section left-section">
          {/* <Search /> */}
          {isManager && (
            <BackToEmployeesLink
              dataType={dataType}
              setDataType={setDataType}
              employeeId={employeeId}
            />
          )}
          <div className="history__dataList">
            <MenuData />
          </div>
        </section>
        <section className="history__section right-section">
          <div id="history__dataContainer">
            <Header />
            <Agenda.Data currentMeeting={selectedMeeting} readOnly={true} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default History;
