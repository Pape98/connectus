import React from 'react';
import { connect } from 'react-redux';

import { surveyActions } from '../../../../state/actions';

import './style.scss';

// Displays filled out survey for viewonly
const MeetingSurvey = () => {
  return (
    <table className='ui very basic padded collapsing celled table'>
      <tbody>
        <tr>
          <td>
            <div>Reaction</div>
          </td>
          <td>
            <div className='ui label'>Happy</div>
          </td>
        </tr>
        <tr>
          <td>Professional Observations</td>
          <td>
            Sed vitae risus odio. Maecenas gravida velit ex, vel sollicitudin
            diam ornare in. Fusce efficitur ante mi, eget placerat libero
            ultrices in. Nullam accumsan rutrum enim at lacinia.
          </td>
        </tr>
        <tr>
          <td>Personal Observations</td>
          <td>
            Vivamus aliquet pulvinar sagittis. Aliquam convallis nisi vitae
            bibendum vestibulum. Curabitur vehicula varius faucibus. Suspendisse
            elit libero, pellentesque eu urna a, euismod porttitor ex. Phasellus
            ac enim sit amet purus pharetra facilisis id non urna.
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOldSurvey: meetingId =>
      dispatch(surveyActions.fetchOldSurvey(meetingId)),
    fetchNewSurvey: meetingId =>
      dispatch(surveyActions.fetchNewSurvey(meetingId)),
  };
};

const mapStateToProps = state => {
  const {
    survey,
    user: { profile },
  } = state;
  return { newSurvey: survey.new, oldSurvey: survey.old, profile };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeetingSurvey);
