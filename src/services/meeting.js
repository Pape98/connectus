import axios from "axios";
import { getServerUrl, ROUTES, TOKENS } from "../constants";
import { getHeaders } from "../utils";
import omit from "lodash/omit";

const PATH = ROUTES.API.MEETINGS;
const SERVER_URL = getServerUrl();

export const createMeeting = async (payload) => {
  const url = `${SERVER_URL}${PATH}`;
  const { data } = await axios.post(url, payload, {
    ...getHeaders(TOKENS.CUSTOM),
  });
  return data;
};

export const deleteMeeting = async (meetingId) => {
  const url = `${SERVER_URL}${PATH}/${meetingId}`;
  const { data } = await axios.delete(url, { ...getHeaders(TOKENS.CUSTOM) });
  return data;
};

export const fetchAllMeetings = async (params) => {
  const url = `${SERVER_URL}${PATH}`;
  const { data } = await axios.get(url, {
    ...getHeaders(TOKENS.CUSTOM),
    params,
  });
  return data;
};

export const fetchMeeting = async (meetingId) => {
  const url = `${SERVER_URL}${PATH}/${meetingId}`;
  const { data } = await axios.get(url, { ...getHeaders(TOKENS.CUSTOM) });
  return data;
};

export const updateMeeting = async (updatedMeeting) => {
  const url = `${SERVER_URL}${PATH}/${updatedMeeting.id}`;
  const newUpdatedMeeting = omit(updatedMeeting, ["id"]);
  return axios.put(url, newUpdatedMeeting, { ...getHeaders(TOKENS.CUSTOM) });
};
