const API = {
  MEETINGS: "/v1/meetings",
  EMPLOYEES: "/v1/employees",
  NOTES: "/agenda-items",
  SURVEYS: "/surveys",
};

const CLIENT = {
  EMPLOYEES: "/employees",
  HISTORY: "/history",
  HOME: "/home",
  MESSAGE: "/message",
  ERROR: "/error",
  LOADING: "/loading",
  LOGIN: "/",
  MEETINGS: "/meetings",
  PROFILE: "/profile",
  ONBOARDING: "/onboarding",
  TERMS: "/terms",
};

const GRAPH = {
  USER_PROFILE: "https://graph.microsoft.com/v1.0/me",
  USERS: "https://graph.microsoft.com/v1.0/users",
};

const ROUTES = { API, CLIENT, GRAPH };

export default ROUTES;
