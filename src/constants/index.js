import ROUTES from "./routes";
import NOTES from "./notes";
import INTERESTS from "./interests";
import { Messages, MessageTypes } from "./messages";

const PROFILE_SURVEY = "profileSurvey";

const API_ENDPOINTS = {
  LOCAL: "http://localhost:5000",
  DEV: "https://connectus-service.herokuapp.com",
};

const SCOPES = {
  CUSTOM: ["api://813acd54-1ed4-47f6-830e-38a586aa1c78/access_as_user"], // Access to our application
  GRAPH: ["User.Read", "User.ReadBasic.All"], // Access to user profile on Azure
};

const Survey = {
  OLD: "OLD",
  NEW: "NEW",
};

const TOKENS = {
  GRAPH: "graph",
  CUSTOM: "custom",
};

const getServerUrl = () => {
  switch (window.location.origin) {
    case "http://localhost:3000":
      return API_ENDPOINTS.DEV;
    case "https://connectus-ui.herokuapp.com":
      return API_ENDPOINTS.DEV;
    default:
      return API_ENDPOINTS.DEV;
  }
};

export {
  getServerUrl,
  API_ENDPOINTS,
  MessageTypes,
  Messages,
  Survey,
  INTERESTS,
  NOTES,
  ROUTES,
  SCOPES,
  TOKENS,
  PROFILE_SURVEY,
};
