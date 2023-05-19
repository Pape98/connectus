import React, { useEffect } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import camelCase from 'lodash/camelCase';
import mapKeys from 'lodash/mapKeys';
import isEmpty from 'lodash/isEmpty';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { remove } from '../../utils';
import { employeeActions } from '../../state/actions';
import {
  Accordion,
  Button,
  Questions,
  Redirect,
  Employee,
} from '../../components';
import './style.scss';

const List = () => {
  return (
    <div className='info__list'>
      <div>ConnectUs</div>
    </div>
  );
};

let Profile = props => {
  const { handleSubmit, user, initialize, fetchEmployees, employees } = props;
  let userCamelCase = mapKeys(user, (v, k) => camelCase(k));

  const employeesList = remove(employees, { id: user.id });

  useEffect(() => {
    fetchEmployees();
  }, [user]);

  useEffect(() => {
    if (!isEmpty(userCamelCase)) {
      let interests = [];
      if (userCamelCase?.interests.length)
        interests = userCamelCase?.interests.split(',').map(interest => {
          return { value: interest, label: interest };
        });

      const superior = employeesList.filter(
        employee => employee.id === userCamelCase?.superiorId
      );

      let name = 'None';
      if (superior.length !== 0) {
        name = superior[0]?.first_name + ' ' + superior[0]?.last_name;
      }

      userCamelCase = {
        dateOfBirth: userCamelCase?.dateOfBirth,
        companyStartDate: dayjs(userCamelCase?.companyStartDate).format(
          'YYYY-MM-DD'
        ),
        preferPrivatePraise: userCamelCase?.preferPrivatePraise?.toString(),
        preferSupport: userCamelCase?.preferSupport?.toString(),
        personalDetailsText: userCamelCase?.personalDetailsText,
        significantOthersText: userCamelCase?.significantOthersText,
        petPeevesText: userCamelCase?.petPeevesText,
        meetingPreference: userCamelCase?.meetingPreference,
        communicationPreferenceText: userCamelCase?.communicationPreferenceText,
        cheerText: userCamelCase?.cheerText,
        interests,
        superiorId: {
          value: userCamelCase?.superiorId,
          label: name,
        },
      };

      initialize(userCamelCase);
    }
  }, [user, employees]);

  return (
    <Redirect>
      <div className='profile'>
        <h1>Profile</h1>
        <div className='segment'>
          <div className='profile__grid'>
            <div className='profile__info'>
              {/* <img src="profile.jpeg" /> */}
              <Employee.ProfileImage employee={user} />
              <h5>John Smith</h5>
              {/* <div className="info_title">Project Manager</div> */}
              <List />
            </div>
            <form className='profile__survey ui form' onSubmit={handleSubmit}>
              <Accordion title='About Me' icon='user'>
                <section className='survey__accordion'>
                  <Questions.AboutComponents users={employeesList} />
                </section>
              </Accordion>
              <Accordion title='Work Details' icon='briefcase'>
                <section className='survey__accordion'>
                  <Questions.PraiseComponents />
                  <Questions.SupportComponents />
                  <Questions.CommunicationComponents />
                </section>
              </Accordion>
              <Accordion title='Personal Preferences' icon='heart'>
                <section className='survey__accordion'>
                  <Questions.InterestsComponents />
                  <Questions.PreferenceComponents
                    label='Any pet peeves you want people to be aware of? '
                    rows='4'
                    name='petPeevesText'
                  />
                  <Questions.PreferenceComponents
                    label='Any significant people in your life you’d like others to know about and first names'
                    rows='4'
                    name='significantOthersText'
                  />
                  <Questions.PreferenceComponents
                    label='Any other personal details you’d like to share?'
                    rows='4'
                    name='personalDetailsText'
                  />
                </section>
              </Accordion>
              <div className='profile__button-container'>
                <Button.Base
                  text='Save Changes'
                  classname='baseButton--submit'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Redirect>
  );
};

const onSubmit = (values, dispatch) => {
  toast.info('Profile updated!', {
    className: 'toast-custom',
  });
  dispatch(employeeActions.updateEmployee);
};

Profile = reduxForm({
  form: 'profileSurvey',
  onSubmit,
})(Profile);

const mapStateToProps = state => {
  const {
    employee: { selected },
  } = state;
  return { user: selected };
};

export default connect(mapStateToProps, null)(Profile);
