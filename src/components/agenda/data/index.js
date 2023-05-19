import React from 'react';
import { Agenda } from '../../';
import MeetingSurvey from './meetingSurvey';
import { Survey } from '../../../constants';
import { Accordion } from '../../';
import './style.scss';

const Data = props => {
  const { readOnly } = props;

  const PostOneOnOne = () => {
    if (!readOnly) return null;
    return (
      <Accordion title='Post 1-1 Notes' icon='history'>
        <MeetingSurvey meetingId={1} surveyType={Survey.NEW} />
      </Accordion>
    );
  };

  return (
    <>
      <Accordion title='Pre 1-1 Notes' icon='history'>
        <MeetingSurvey meetingId={1} surveyType={Survey.OLD} />
      </Accordion>

      <PostOneOnOne />

      <Agenda.Section
        title='Key Points'
        icon='pin'
        meetingId={1}
        readOnly={readOnly}
      />
    </>
  );
};

export default Data;
