import axios from "axios";
import { getServerUrl, ROUTES, TOKENS } from "../constants";
import { getHeaders } from "../utils";
import omit from "lodash/omit";

const SERVER_URL = getServerUrl();

export const createNote = async (payload) => {
  const url = `${SERVER_URL + ROUTES.API.MEETINGS}/${payload.meetingId}${
    ROUTES.API.NOTES
  }`;
  const { data } = await axios.post(url, payload, {
    ...getHeaders(TOKENS.CUSTOM),
  });
  return data;
};

export const deleteNote = async (meetingId, noteId) => {
  const url = `${SERVER_URL + ROUTES.API.MEETINGS}/${meetingId}${
    ROUTES.API.NOTES
  }/${noteId}`;
  return axios.delete(url, {
    ...getHeaders(TOKENS.CUSTOM),
  });
};

export const fetchAllNotes = async (meetingId) => {
  const url = `${SERVER_URL + ROUTES.API.MEETINGS}/${meetingId}${
    ROUTES.API.NOTES
  }`;
  const { data } = await axios.get(url, {
    ...getHeaders(TOKENS.CUSTOM),
  });
  return data;
};

export const updateNote = async (updatedNote) => {
  const url = `${SERVER_URL + ROUTES.API.MEETINGS}/${updatedNote.meetingId}${
    ROUTES.API.NOTES
  }/${updatedNote.id}`;
  const newUpdatedNote = omit(updatedNote, ["id"]);
  return axios.put(url, newUpdatedNote, {
    ...getHeaders(TOKENS.CUSTOM),
  });
};
