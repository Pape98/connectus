import dayjs from "dayjs";
import { toast } from "react-toastify";
import store from "../";
import { TOKENS, Messages } from "../constants";
import { createBrowserHistory } from "history";
import reject from "lodash/reject";
import upperFirst from "lodash/upperFirst";

export const browserHistory = createBrowserHistory();

export class Message {
  constructor(text, type) {
    this.message = {
      ...Messages[type],
      text: text,
    };
  }

  get() {
    return this.message;
  }
}

export const remove = (array, params) => {
  return reject(array, params);
};

export const getTokenFromStore = (tokenType) => {
  const { user } = store.getState();
  const token =
    tokenType === TOKENS.CUSTOM ? user.accessToken : user.graphToken;
  return token;
};

export const getHeaders = (tokenType) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getTokenFromStore(tokenType)}`,
  };
  return { headers: headers };
};

export const isAccessTokenEmpty = () => {
  const {
    user: { accessToken },
  } = store.getState();
  return accessToken === "";
};

export const formatDate = (format, dateParam = new Date()) => {
  const date = new Date(dateParam).toISOString().slice(0, 10);
  return dayjs(date).format(format);
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    timeStyle: "short",
  });
};

export const fields = {
  newMeetingManager: ["title", "employee", "date", "time"],
  newMeetingEmployee: ["title", "date", "time"],
  survey: ["reaction", "professionalObservations", "personalObservations"],
};

export const showErrorToast = (message) => {
  toast.error(message);
};

export const isFormValid = async (formName, isManager = false) => {
  const form = store.getState().form[formName];

  if (form.values === undefined) {
    toast.error("Form cannot be empty!");
    return false;
  }

  const activeFields = Object.keys(form.values);

  let formFields;

  if (formName === "newMeeting" && !isManager)
    formFields = fields["newMeetingEmployee"];
  else if (formName === "newMeeting" && isManager)
    formFields = fields["newMeetingManager"];
  else formFields = fields[formName];

  const missingFields = formFields.filter(
    (field) => !activeFields.includes(field)
  );

  if (missingFields.length === 0) return true;

  for (let i = 0; i < missingFields.length; i) {
    await new Promise(() =>
      setTimeout(() =>
        showErrorToast(`"${upperFirst(missingFields[i])}" is required!`, 1000)
      )
    );
  }

  return false;
};
