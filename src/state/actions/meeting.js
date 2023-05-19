import { toast } from "react-toastify";

import { ActionTypes } from "../actions";
import { meetingService } from "../../services";
import { noteActions } from "./";
import { isAccessTokenEmpty } from "../../utils";
import { formatDate } from "../../utils";
import { NOTES } from "../../constants";

export const clearCurrentMeeting = () => (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.CLEAR_CURRENT_MEETING,
      payload: {},
    });
  } catch (error) {
    console.log(error);
  }
};

// Helper function creates meeting and creates default notes for meeting
export const createMeetingHelper = async (dispatch, newMeetingData) => {
  const data = await meetingService.createMeeting(newMeetingData);
  dispatch({ type: ActionTypes.CREATE_MEETING, payload: data });
  dispatch(fetchAllMeetings());
  NOTES.map(
    async (text) => await dispatch(noteActions.createNote(data.id, text, true))
  );

  return data.id;
};

export const createMeeting = async (dispatch, getState) => {
  try {
    const { date, time, employee, title } = getState().form.newMeeting.values;
    const {
      employee: { selected: user },
    } = getState();

    const meetingDate = new Date(date + "T" + time).toUTCString();
    const newMeeting = {
      meetingDate,
      createdBy: user.id,
      title: `${title.value} (${formatDate("MM-DD-YYYY", new Date(date))})`,
      recipientId: employee ? employee.value.employee : user.superior_id,
      active: true,
      isFinishedRecipient: false,
    };
    await createMeetingHelper(dispatch, newMeeting);

    toast.info("Meeting created!", {
      className: "toast-custom",
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteMeeting = (meetingId) => async (dispatch) => {
  try {
    const response = await meetingService.deleteMeeting(meetingId);
    dispatch({ type: ActionTypes.DELETE_MEETING, payload: response });
    dispatch(fetchAllMeetings());
    toast.info("Meeting deleted!", {
      className: "toast-custom",
    });
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllMeetings =
  (employeeId = null) =>
  async (dispatch, getState) => {
    const {
      user: {
        profile: { id },
      },
      employee: { selected },
    } = getState();

    let meetings = [];

    // Determine which user ID
    const idToUse = selected.superior_id === null ? id : selected.superior_id;

    try {
      if (isAccessTokenEmpty()) return;
      if (employeeId) {
        // * Get all meetings between employee and manager
        meetings = await meetingService.fetchAllMeetings({
          createdBy: idToUse,
          recipientId: employeeId,
        });
      } else {
        // * Get all meetings for current user (history view)
        meetings = await meetingService.fetchAllMeetings({
          employeeId: id,
        });
      }
      dispatch({
        type: ActionTypes.FETCH_MEETINGS,
        payload: meetings,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const fetchMeeting = (meetingId) => async (dispatch) => {
  try {
    if (isAccessTokenEmpty()) return;
    if (meetingId === undefined) return;
    const data = await meetingService.fetchMeeting(meetingId);
    dispatch({ type: ActionTypes.FETCH_MEETING, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const setCurrentMeeting = (currentMeeting) => (dispatch) => {
  try {
    dispatch({
      type: ActionTypes.SET_CURRENT_MEETING,
      payload: currentMeeting,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateMeeting = (updatedMeeting) => async (dispatch) => {
  try {
    const formattedUpdatedMeeting = {
      id: updatedMeeting.id,
      meetingDate: updatedMeeting.meeting_date,
      createdBy: updatedMeeting.created_by,
      title: updatedMeeting.title,
      recipientId: updatedMeeting.recipient_id,
      active: updatedMeeting.active,
      isFinishedRecipient: updatedMeeting.is_finished_recipient,
    };
    const data = await meetingService.updateMeeting(formattedUpdatedMeeting);
    dispatch({ type: ActionTypes.UPDATE_MEETING, payload: data });
    dispatch(fetchAllMeetings);
  } catch (error) {
    console.log(error);
  }
};
