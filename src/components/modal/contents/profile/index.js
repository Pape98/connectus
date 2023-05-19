import React from 'react';
import './style.scss';

const Interests = () => {
  return <div className='interests'>Interests</div>;
};

const Profile = () => {
  return (
    <div className='full-profile'>
      <table className='ui very basic collapsing celled table'>
        <tbody>
          <tr>
            <td>Start Date</td>
            <td>12/22/1998</td>
          </tr>
          {/* <tr>
            <td>Date of birth</td>
            <td>{formatDate("ddd, MMM D, YYYY", profile.date_of_birth)}</td>
          </tr> */}
          <tr>
            <td>Do you like to be praised in public or in private?</td>
            <td>Private</td>
          </tr>
          <tr>
            <td>
              How do you like to be cared for or cheered up during a tough time?
            </td>
            <td>Cheer text</td>
          </tr>
          <tr>
            <td>
              Be supported closely or given space to operate independently?
            </td>
            <td>Being supported</td>
          </tr>
          <tr>
            <td>Virtual meetings preference</td>
            <td>Preferences</td>
          </tr>
          <tr>
            <td>What are your some of your interests?</td>
            <td>
              <Interests list={[]} />
            </td>
          </tr>
          <tr>
            <td>Any pet peeves you want people to be aware of?</td>
            <td>Pet peeves</td>
          </tr>
          <tr>
            <td>
              Any significant people in your life you’d like others to know
              about and first names
            </td>
            <td>Significant other</td>
          </tr>
          <tr>
            <td>Any other personal details you’d like to share?</td>
            <td>Personal details</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
