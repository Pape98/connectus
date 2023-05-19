import React from 'react';
import { connect, useSelector } from 'react-redux';
import { formatDate } from '../../../utils';
import './style.scss';

const Card = ({ meeting }) => {
  const formattedDate = formatDate('ddd, MMM D, YYYY', '12/22/1998');
  const selectedMeetingId = useSelector(state => state.meeting.current.id);
  const selectedClass =
    selectedMeetingId === meeting.id ? 'meetingCard--selected' : '';

  return (
    <div className={`meetingCard ${selectedClass}`}>
      <div className='segment'>
        <div className='meetingCard__title'>Meeting Title</div>
        <div className='meetingCard__date'>
          <div className='date__icon'>
            <i className='handshake outline icon'></i>
          </div>
          <div>{formattedDate}</div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, null)(Card);
