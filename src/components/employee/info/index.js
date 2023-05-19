import React, { useState } from 'react';

import { Modal, Button } from '../../';
import ProfileImage from '../profileImage';
import { useGetEmployee } from '../../../hooks';
import './style.scss';

const SummaryProfileCard = ({ showSummary, showProfileHandler }) => {
  const showStatusClass = showSummary ? 'show' : 'hidden';
  return (
    <div className={'summaryProfileCard ' + showStatusClass}>
      <div className='segment'>
        <section className='dates__container'>
          <div>
            <div>Start Date</div>
            <div className='text'>12/22/1998</div>
          </div>
        </section>
        <section>
          <div>Interests</div>
          <div className='interests__container'>Interests</div>
        </section>
        <section>
          <div>Pet Peeves</div>
          <div className='text'>List of pet peeves</div>
        </section>
        <section>
          <div>Significant Others</div>
          <div className='text'>Significant other</div>
        </section>
        <section>
          <div>Personal Details</div>
          <div className='text'>Personal details</div>
        </section>
        <Button.Base
          text='Full Profile'
          classname='baseButton--show'
          onClickHandler={showProfileHandler}
        />
      </div>
    </div>
  );
};

const Info = props => {
  const { employeeId } = props;
  const employee = useGetEmployee(employeeId);
  const [showSummary, setShowSummary] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const showProfileHandler = () => {
    setShowSummary(false);
    setShowProfile(true);
  };

  const onMouseOver = () => {
    if (!window.location.pathname.includes('/meetings/')) return null;
    setShowSummary(true);
  };

  const onMouseOut = () => {
    if (!window.location.pathname.includes('/meetings/')) return null;
    setShowSummary(false);
  };

  return (
    <section>
      <div
        className='employee-info'
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
      >
        <ProfileImage employee={employee} />
        <div className='employee__detail'>
          <div className='employee__name'>
            {' '}
            <span></span>
            John Smith
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
        title='John Smith'
        OnNegativeButtonClick={() => setShowProfile(false)}
        negativeLabel='Close'
      >
        <Modal.Contents.Profile profile={employee} />
      </Modal>
    </section>
  );
};

export default Info;
