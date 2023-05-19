import { ActionTypes } from "../actions";
import { employeeService } from "../../services";
import camelCase from "lodash/camelCase";
import mapKeys from "lodash/mapKeys";
import { ROUTES } from "../../constants";

export const createEmployee = async (dispatch, getState) => {
  try {
    const {
      user: { profile },
      form: {
        profileSurvey: { values },
      },
    } = getState();

    const {
      id,
      givenName: firstName,
      surname: lastName,
      mail: email,
      mobilePhone: phoneNumber,
    } = profile;

    const interests = values?.interests?.length
      ? values.interests.map((interest) => interest.value)
      : [];

    let superiorId;

    // Handling case where user does not have manager
    if (
      values?.superiorId === undefined ||
      values?.superiorId?.value === "none"
    ) {
      superiorId = null;
    } else superiorId = values?.superiorId?.value;

    const val = values ? values : {};

    const newEmployee = {
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      ...val,
      superiorId,
      interests,
      signedTerms: true,
      preferPrivatePraise: values?.preferPrivatePraise
        ? values?.preferPrivatePraise === true
        : null,
      preferSupport: values?.preferSupport
        ? values?.preferSupport === true
        : null,
    };

    const data = await employeeService.createEmployee(newEmployee);

    dispatch({type: ActionTypes.CREATE_EMPLOYEE, payload: data});
    dispatch(fetchEmployee(data.id));
    dispatch({ type: ActionTypes.SET_IS_NEW_USER, payload: false });
    dispatch({ type: ActionTypes.REDIRECT, payload: ROUTES.CLIENT.LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const fetchEmployee = (employeeId) => async (dispatch, getState) => {
  try {
    const {
      user: { accessToken },
    } = getState();

    if (!accessToken) return;

    const data = await employeeService.fetchEmployee(employeeId);
    dispatch({
      type: ActionTypes.FETCH_EMPLOYEE,
      payload: data,
    });
    return { data };
  } catch (error) {
    console.log(error);
  }
};

export const fetchEmployees =
  (userId = null) =>
  async (dispatch, getState) => {
    try {
      const {
        user: { accessToken },
      } = getState();

      if (!accessToken) return;

      let data;

      if (userId !== null)
        data = await employeeService.fetchMyEmployees(userId); // Employees for current manager
      else data = await employeeService.fetchAllEmployees(); // All employees in databsase (dropdown)

      dispatch({
        type: ActionTypes.FETCH_EMPLOYEES,
        payload: Object.values(data),
      });
    } catch (error) {
      console.log(error);
    }
  };

export const fetchMyEmployees = async (dispatch, getState) => {
  try {
    const {
      user: {
        profile: { id },
        accessToken,
      },
    } = getState();

    if (!accessToken) return;

    let data = await employeeService.fetchMyEmployees(id);

    dispatch({
      type: ActionTypes.FETCH_EMPLOYEES,
      payload: Object.values(data),
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateEmployee = async (dispatch, getState) => {
  try {
    const {
      form: { profileSurvey },
      employee: { selected },
    } = getState();

    const selectedCamelCase = mapKeys(selected, (v, k) => camelCase(k));
    let updatedEmployee = { ...selectedCamelCase, ...profileSurvey.values };
    updatedEmployee = {
      ...updatedEmployee,
      superiorId:
        updatedEmployee.superiorId.value === "none"
          ? null
          : updatedEmployee.superiorId.value,
      interests: updatedEmployee.interests.map((interest) => interest.value),
    };

    const data = employeeService.updateEmployee(updatedEmployee);
    await dispatch({ type: ActionTypes.UPDATE_EMPLOYEE, payload: data });
    dispatch(await fetchEmployee(updatedEmployee.id));
    dispatch({
      type: ActionTypes.REDIRECT,
      payload: ROUTES.CLIENT.PROFILE,
    });
  } catch (error) {
    console.log(error);
  }
};
