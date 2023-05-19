import { toast } from "react-toastify";

import { ActionTypes, meetingActions, navigationActions } from "../actions";
import { surveyService, meetingService } from "../../services";
import { formatDate } from "../../utils";
import { isAccessTokenEmpty } from "../../utils";

export const createSurvey = (meeting) => async (dispatch, getState) => {
  try {
    const {
      form: {
        survey: { values: survey },
      },
      employee: { selected },
    } = getState();

    const isManager = selected.superior_id === null;

    let surveyData = {
      createdBy: selected.id,
      meetingId: meeting.id,
      createdAt: new Date().toUTCString(),
    };

    if (survey) {
      surveyData.professionalObservations = survey?.professionalObservations;
      surveyData.personalObservations = survey?.personalObservations;
      surveyData.reaction = survey?.reaction;
    }
    
    const newSurveydata = await surveyService.createSurvey(surveyData);
    await dispatch({ type: ActionTypes.CREATE_NOTE, payload: newSurveydata });

    // Create followup meeting if box is checked in post 1-1 survey
    if (survey.followUp) {
      const { meetingDate, meetingTime } = survey;
      const newMeeting = {
        meetingDate: new Date(meetingDate + "T" + meetingTime).toUTCString(),
        createdBy: selected.id,
        title: `General Check-in (${formatDate("MM-DD-YYYY", meetingDate)})`,
        // Add the id of other recipient based on current user
        recipientId:
          selected.id === meeting.recipient_id
            ? meeting.created_by
            : meeting.recipient_id,
        active: true,
        isFinishedRecipient: false,
      };

      // Helper function creates meeting and creates default notes for meeting
      await meetingActions.createMeetingHelper(dispatch, newMeeting);
    }

    const updatedPreviousMeeting = {
      ...meeting,
      active: isManager ? false : meeting.active,
      is_finished_recipient:
        isManager === false ? true : meeting.is_finished_recipient,
    };

    await dispatch(meetingActions.updateMeeting(updatedPreviousMeeting));


    dispatch(meetingActions.fetchAllMeetings());
    dispatch(navigationActions.redirect("/meetings"));
    toast.info("Thanks for the feedback!", {
      className: "toast-custom",
    });

    return newSurveydata;
  } catch (error) {
    console.log(error);
  }
};

export const fetchNewSurvey = (meetingId) => async (dispatch, getState) => {
  if (isAccessTokenEmpty()) return;
  try {
    const {
      user: {
        profile: { id },
      },
    } = getState();
    let data = await surveyService.fetchSurvey(meetingId);

    // Meeting will have survey created by both employee and manager
    data = Array.isArray(data)
      ? data.find((survey) => survey.created_by === id)
      : [];

    dispatch({ type: ActionTypes.FETCH_NEW_SURVEY, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchOldSurvey = (meetingId) => async (dispatch, getState) => {
  if (isAccessTokenEmpty()) return;

  try {
    const {
      user: {
        profile: { id: userId },
      },
    } = getState();

    // 1. Get the current meeting
    const meeting = await meetingService.fetchMeeting(meetingId);

    // 2. Get both employee and manager IDs
    const params = {
      createdBy: meeting.created_by,
      recipientId: meeting.recipient_id,
    };

    // 3. Get all meetings between employee and manager 
    // (always sorted by date of meeting in descending order )
    const meetings = await meetingService.fetchAllMeetings(params);

    // 4. Find the position of the current meeting
    const indexofCurrentMeeting = meetings.findIndex(
      (meeting) => meeting.id === meetingId
    );

    // 5. If index after current meeting exists, grab it and fetch that survey for that meeting
    if (meetings[indexofCurrentMeeting + 1]) {
      const latestMeetingId = meetings[indexofCurrentMeeting + 1].id;

      let oldSurvey = await surveyService.fetchSurvey(latestMeetingId);

      const oldSurveyIndex = oldSurvey.findIndex(
        (survey) => survey.created_by === userId
      );

      oldSurvey = oldSurvey[oldSurveyIndex];

      dispatch({
        type: ActionTypes.FETCH_OLD_SURVEY,
        payload: oldSurvey,
      });
    } else
      dispatch({
        type: ActionTypes.FETCH_OLD_SURVEY,
        payload: {},
      });
  } catch (error) {
    console.log(error);
  }
};
