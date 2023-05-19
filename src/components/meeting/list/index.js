import React from 'react';

import { formatDate } from '../../../utils';
import MeetingDetails from './meetingDetails';
import './style.scss';

const List = () => {
  const list = [1, 2, 3, 4].map(meeting => {
    return (
      <section key={meeting.id}>
        <p className='meeting_date'>{formatDate('ddd, MMM D', '12/22/1998')}</p>{' '}
        <MeetingDetails meeting={meeting} />{' '}
      </section>
    );

    // return <MeetingDetails meeting={meeting} key={meeting.id} />;
  });

  return (
    <div className='segment meetings__list'>
      <div>{list}</div>
    </div>
  );
};

export default List;
