import axios from "axios";
import { getServerUrl, ROUTES, TOKENS } from "../constants";
import { getHeaders } from "../utils";

const API_EMPLOYEE_PATH = ROUTES.API.EMPLOYEES;
const SERVER_URL = getServerUrl();

export const createEmployee = async (payload) => {
  const url = `${SERVER_URL}${API_EMPLOYEE_PATH}`;
  const { data } = await axios.post(url, payload, {
    ...getHeaders(TOKENS.CUSTOM),
  });
  return data;
};

export const fetchMyEmployees = async (userId) => {
  const url = `${SERVER_URL}${API_EMPLOYEE_PATH}`;
  const params = { superiorId: userId };
  const { data } = await axios.get(url, {
    ...getHeaders(TOKENS.CUSTOM),
    params,
  });
  return data;
};

export const fetchAllEmployees = async () => {
  const url = `${SERVER_URL}${API_EMPLOYEE_PATH}`;
  const { data } = await axios.get(url, { ...getHeaders(TOKENS.CUSTOM) });
  return data;
};

export const fetchEmployee = async (employeeId) => {
  const url = `${SERVER_URL}${API_EMPLOYEE_PATH}/${employeeId}`;
  const { data } = await axios.get(url, { ...getHeaders(TOKENS.CUSTOM) });
  return data;
};

export const updateEmployee = async (updatedEmployee) => {
  const url = `${SERVER_URL}${API_EMPLOYEE_PATH}/${updatedEmployee.id}`;
  return axios.put(url, updatedEmployee, { ...getHeaders(TOKENS.CUSTOM) });
};
