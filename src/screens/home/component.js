import React, { useEffect } from "react";
import { ReactSVG } from "react-svg";

import { useIsManager } from "../../hooks";
import { remove } from "../../utils";
import MeetingsList from "./meetingsList";
import ReadingSnippet from "./readingSnippet";
import "./style.scss";

const Home = (props) => {
  const { userProfile, meetings, fetchEmployees, fetchAllMeetings } = props;
  const isManager = useIsManager();

  const params = isManager
    ? { active: false }
    : { is_finished_recipient: true };

  const userIdToFetch = isManager ? null : userProfile.id;

  const activeMeetings = remove(meetings.all, params);

  useEffect(() => {
    fetchEmployees(userProfile.id);
  }, []);

  useEffect(() => {
    fetchAllMeetings(userIdToFetch);
  }, [userProfile]);

  const Meetings = () => {
    if (activeMeetings.length) {
      return (
        <>
          {" "}
          <h3>Your Next 10 Meetings</h3>
          <div className="ui divided selection list">
            <MeetingsList meetings={activeMeetings} />
          </div>
        </>
      );
    }

    return (
      <>
        <h3>No Meetings Today</h3>
        <p>
          Dont see what you are looking for? We only display events from your
          calendar over the next week and scheduled agendas{" "}
        </p>
        <ReactSVG src="/home-undraw.svg" />
        <section className="home-meetings__bottom">
          <p className="text-align--center">Nothing to show here.</p>
        </section>
      </>
    );
  };

  let name = userProfile.first_name + " " + userProfile.last_name;
  if (name.includes("undefined")) return null;

  return (
    <div id="home-container">
      <h1>Welcome {name}</h1>
      <div className="home__grid segment" id="home-segment">
        <section className="home_section">
          <div className="segment home-meetings__segment">
            <Meetings />
          </div>
        </section>
        <section className="home_section">
          <div className="reading-snippets">
            <ReadingSnippet
              title="Get Started with ConnectUS"
              text="Let's look more into all the ways you can use ConnectUS to communicate with your team."
              link={"https://www.connect-us.io "}
            />
            <ReadingSnippet
              title="Enhance corporate culture"
              text="Culture is not dictated by executives, but is built by the employees."
              link="https://www.connect-us.io "
            />
            <ReadingSnippet
              title="Company administration"
              text="Learn how to manage your ConnectUS account on a team or company level."
              link="https://www.connect-us.io "
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
