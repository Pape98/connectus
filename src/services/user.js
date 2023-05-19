import axios from "axios";
import { ROUTES, TOKENS } from "../constants";
import { getHeaders } from "../utils";

// Used for Graph API only
export const fetchUserProfile = async () => {
  const url = ROUTES.GRAPH.USER_PROFILE;
  const { data } = await axios.get(url, { ...getHeaders(TOKENS.GRAPH) });
  return data;
};
