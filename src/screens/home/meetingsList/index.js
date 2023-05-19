import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetEmployee } from '../../../hooks';
import { ROUTES } from '../../../constants';
import { formatTime, formatDate } from '../../../utils';

import { v4 as uuidv4 } from 'uuid';

import './style.scss';
const Employee = ({ employeeId }) => {
  const employee = useGetEmployee(employeeId);
  if (employee) return <>{employee.first_name + ' ' + employee.last_name}</>;
  return (
    <span className='ui placeholder'>
      {' '}
      <span className='full line'></span>
    </span>
  );
};

const MeetingsList = ({ meetings }) => {
  let currentDate = null;
  const currentUserId = useSelector(state => state.user.profile.id);

  const meetingsList = meetings.reverse().map((meeting, index) => {
    if (index > 10) return;

    const employeeToFecth =
      currentUserId === meeting.recipient_id
        ? meeting.created_by
        : meeting.recipient_id;

    const date = () => {
      return <li key={uuidv4()}>12/22/1998</li>;
    };

    return (
      <Fragment key={uuidv4()}>
        {date()}
        <Link
          key={uuidv4()}
          to={`${ROUTES.CLIENT.MEETINGS}/${meeting.id}`}
          className='item'
        >
          <div className='ui red horizontal large label' key={uuidv4()}>
            {formatTime(meeting.meeting_date)}
          </div>{' '}
          <Employee employeeId={employeeToFecth} key={uuidv4()} />
        </Link>
      </Fragment>
    );
  });

  return <>{meetingsList}</>;
};

export default MeetingsList;
