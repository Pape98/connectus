import React from "react";
import { formatDate } from "../../../../utils";
import "./style.scss";

const Interests = ({ list }) => {
  return (
    <div className="interests">
      {list.split(",").map((interest, index) => (
        <div key={index} className="ui label">
          {interest}
        </div>
      ))}
    </div>
  );
};

const Profile = ({ profile }) => {
  return (
    <div className="full-profile">
      <table className="ui very basic collapsing celled table">
        <tbody>
          <tr>
            <td>Start Date</td>
            <td>
              {formatDate("ddd, MMM D, YYYY", profile.company_start_date)}
            </td>
          </tr>
          {/* <tr>
            <td>Date of birth</td>
            <td>{formatDate("ddd, MMM D, YYYY", profile.date_of_birth)}</td>
          </tr> */}
          <tr>
            <td>Do you like to be praised in public or in private?</td>
            <td>
              {profile.prefer_private_praise === true ? "Private" : "Public"}
            </td>
          </tr>
          <tr>
            <td>
              How do you like to be cared for or cheered up during a tough time?
            </td>
            <td>{profile.cheer_text}</td>
          </tr>
          <tr>
            <td>
              Be supported closely or given space to operate independently?
            </td>
            <td>
              {profile.prefer_support === true
                ? "Being supported"
                : "Being independent"}
            </td>
          </tr>
          <tr>
            <td>Virtual meetings preference</td>
            <td>{profile.meeting_preference}</td>
          </tr>
          <tr>
            <td>What are your some of your interests?</td>
            <td>
              <Interests list={profile.interests} />
            </td>
          </tr>
          <tr>
            <td>Any pet peeves you want people to be aware of?</td>
            <td>{profile.pet_peeves_text}</td>
          </tr>
          <tr>
            <td>
              Any significant people in your life you’d like others to know
              about and first names
            </td>
            <td>{profile.significant_others_text}</td>
          </tr>
          <tr>
            <td>Any other personal details you’d like to share?</td>
            <td>{profile.personal_details_text}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Profile;
