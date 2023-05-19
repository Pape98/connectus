import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ReactSVG } from "react-svg";

import { surveyActions } from "../../../../state/actions";
import { Survey } from "../../../../constants";
import isEmpty from "lodash/isEmpty";

import "./style.scss";

const NoSurvey = () => {
  return (
    <div className="noSurvey__container">
      <ReactSVG src="undraw_empty.svg" />
      <p>No notes</p>
    </div>
  );
};

// Displays filled out survey for viewonly
const MeetingSurvey = ({
  meetingId,
  surveyType,
  newSurvey,
  oldSurvey,
  fetchNewSurvey,
  fetchOldSurvey,
}) => {
  const [survey, setSurvey] = useState({});

  useEffect(() => {
    if (surveyType === Survey.NEW) setSurvey(newSurvey);
    else if (surveyType === Survey.OLD) setSurvey(oldSurvey);
  });

  useEffect(() => {
    fetchNewSurvey(meetingId);
  }, []);

  useEffect(() => {
    fetchOldSurvey(meetingId);
  }, []);

  if (!isEmpty(survey) && survey) {
    return (
      <table className="ui very basic padded collapsing celled table">
        <tbody>
          <tr>
            <td>
              <div>Reaction</div>
            </td>
            <td>
              <div className="ui label">
                {survey.reaction === "sad" ? "Not sure" : survey.reaction}{" "}
              </div>
            </td>
          </tr>
          <tr>
            <td>Professional Observations</td>
            <td>{survey.professional_observations}</td>
          </tr>
          <tr>
            <td>Personal Observations</td>
            <td>{survey.personal_observations}</td>
          </tr>
        </tbody>
      </table>
    );
  }
  return <NoSurvey />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOldSurvey: (meetingId) =>
      dispatch(surveyActions.fetchOldSurvey(meetingId)),
    fetchNewSurvey: (meetingId) =>
      dispatch(surveyActions.fetchNewSurvey(meetingId)),
  };
};

const mapStateToProps = (state) => {
  const {
    survey,
    user: { profile },
  } = state;
  return { newSurvey: survey.new, oldSurvey: survey.old, profile };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingSurvey);
