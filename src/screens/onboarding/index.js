import React, { useState, useEffect } from "react";
import { ReactSVG } from "react-svg";
import ProgressBar from "@ramonak/react-progress-bar";
import { connect } from "react-redux";

import { employeeActions } from "../../state/actions";
import { Questions, Redirect } from "../../components";
import "./style.scss";

const Onboarding = ({ onSubmit, dispatch, users }) => {
  const [page, setPage] = useState(1);              // Form consists of 8 sections in total
  const [progress, setProgress] = useState(12); 

  const nextPage = () => {
    setPage(page + 1);
    setProgress(progress + 12);
  };
  const previousPage = () => {
    setPage(page - 1);
    setProgress(progress - 12);
  };

  useEffect(() => {
    dispatch(employeeActions.fetchEmployees());
  }, []);

  return (
    <Redirect>
      <div id="onboarding">
        <div className="segment">
          <div className="onboarding__grid">
            <div className="section left-section">
              <ReactSVG src="logo-blue.svg" />
              <p>
                Please tell us a bit more about you to customize your journey.
                You do not need to answer every question. Whenever you want to
                move on to the next question or screen, just click next.
              </p>
              <ProgressBar
                completed={progress}
                bgColor="#48CAE4"
                baseBgColor="#F0F1F2"
                height="17px"
                labelSize="13px"
                className="progressBar"
                labelAlignment="outside"
                labelColor="#000000de"
              />
            </div>
            <div className="section right-section">
              {page === 1 && (
                <Questions.About onSubmit={nextPage} users={users} /> // Need to pass users for the dropdown
              )}
              {page === 2 && (
                <Questions.Praise
                  previousPage={previousPage}
                  onSubmit={nextPage}
                />
              )}
              {page === 3 && (
                <Questions.Support
                  previousPage={previousPage}
                  onSubmit={nextPage}
                />
              )}
              {page === 4 && (
                <Questions.Communication
                  previousPage={previousPage}
                  onSubmit={nextPage}
                />
              )}
              {page === 5 && (
                <Questions.Interests
                  previousPage={previousPage}
                  onSubmit={nextPage}
                />
              )}
              {page === 6 && (
                <Questions.Peeves
                  previousPage={previousPage}
                  onSubmit={nextPage}
                />
              )}
              {page === 7 && (
                <Questions.Significant
                  previousPage={previousPage}
                  onSubmit={nextPage}
                />
              )}
              {page === 8 && (
                <Questions.Additional
                  previousPage={previousPage}
                  onSubmit={onSubmit}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Redirect>
  );
};

const mapStateToProps = (state) => {
  return { users: state.employee.all };
};

export default connect(mapStateToProps, null)(Onboarding);
