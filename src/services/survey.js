import axios from "axios";
import { getServerUrl, ROUTES, TOKENS } from "../constants";
import { getHeaders } from "../utils";

const SERVER_URL = getServerUrl();

export const createSurvey = async (payload) => {
  const url = `${SERVER_URL + ROUTES.API.MEETINGS}/${payload.meetingId}${
    ROUTES.API.SURVEYS
  }`;
  const { data } = await axios.post(url, payload, {
    ...getHeaders(TOKENS.CUSTOM),
  });
  return data;
};

export const fetchSurvey = async (meetingId) => {
  const url = `${SERVER_URL + ROUTES.API.MEETINGS}/${meetingId}${
    ROUTES.API.SURVEYS
  }`;
  const { data } = await axios.get(url, {
    ...getHeaders(TOKENS.CUSTOM),
  });
  return data;
};
