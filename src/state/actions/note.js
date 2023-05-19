import { ActionTypes } from "../actions";
import { noteService } from "../../services";
import { isAccessTokenEmpty } from "../../utils";

export const createNote =
  (meetingId, text = "", is_priority = false) =>
  async (dispatch, getState) => {
    try {
      const {
        user: { profile },
      } = getState();

      const newNote = {
        createdBy: profile.id,
        createdAt: new Date().toISOString(),
        isPriority: is_priority,
        meetingId,
        text: text,
      };
      const data = await noteService.createNote(newNote);
      dispatch({ type: ActionTypes.CREATE_NOTE, payload: data });
      dispatch(fetchAllNotes(meetingId));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

export const deleteNote = (meetingId, noteId) => async (dispatch) => {
  try {
    await noteService.deleteNote(meetingId, noteId);
    dispatch({ type: ActionTypes.DELETE_NOTE, payload: {} });
    dispatch(fetchAllNotes(meetingId));
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllNotes = (meetingId) => async (dispatch) => {
  try {
    if (!isAccessTokenEmpty()) {
      const notes = await noteService.fetchAllNotes(meetingId);
      const sortedNotes = notes.sort((x, y) => x.created_at - y.created_at);
      dispatch(setMeetingId(meetingId));
      dispatch({
        type: ActionTypes.FETCH_ALL_NOTES,
        payload: sortedNotes,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const setMeetingId = (meetingId) => async (dispatch) => {
  dispatch({ type: ActionTypes.SET_MEETING_ID, payload: meetingId });
};

export const updateNote = (updatedNote) => async (dispatch) => {
  try {
    const formattedUpdatedNote = {
      id: updatedNote.id,
      createdAt: updatedNote.created_at,
      createdBy: updatedNote.created_by,
      text: updatedNote.text,
      isPriority: updatedNote.is_priority,
      meetingId: updatedNote.meeting_id,
    };
    const data = await noteService.updateNote(formattedUpdatedNote);
    dispatch({ type: ActionTypes.UPDATE_NOTE, payload: data });
    dispatch(fetchAllNotes(updatedNote.meeting_id));
  } catch (error) {
    console.log(error);
  }
};
