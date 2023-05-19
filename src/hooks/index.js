import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useDispatch, useSelector } from "react-redux";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { employeeService } from "../services";
import { userActions, navigationActions } from "../state/actions";
import { SCOPES } from "../constants";

export const useIsManager = () => {
  const superiorId = useSelector(
    (state) => state.employee.selected.superior_id
  );
  return superiorId === null ? true : false;
};

export const useGetCorrectId = (meeting) => {
  const isManager = useIsManager();
  const id = isManager ? meeting.created_by : meeting.recipient_id;
  return id;
};

export const useRedirect = () => {
  const dispatch = useDispatch();
  const redirectTo = useSelector((state) => state.navigation.redirectTo);
  useEffect(() => {
    dispatch(navigationActions.clearRedirect);
  }, [redirectTo]);
  return redirectTo;
};

export const useGetEmployee = (employeeId) => {
  const [employee, setEmployee] = useState(null);
  const { accessToken } = useSelector((state) => state.user);
  const isAccessTokenValid = accessToken !== "";

  useEffect(() => {
    let subscription = true;
    if (employeeId !== undefined && subscription & isAccessTokenValid) {
      employeeService.fetchEmployee(employeeId).then((response) => {
        if (response != undefined && subscription) setEmployee(response);
      });
    }
    return () => (subscription = false);
  }, [employeeId, accessToken]);

  return employee;
};

export const useIsAllowed = (id) => {
  const currentUserId = useSelector((state) => state.user.profile.id);
  return currentUserId === id;
};

export const useGetToken = (scopes) => {
  const { instance, inProgress, accounts } = useMsal();
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  const accessTokenRequest = {
    scopes: scopes,
    account: accounts[0],
  };

  useEffect(() => {
    let subscription = true;
    try {
      if (accounts[0] && subscription) {
        instance
          // Checking the cache in browser storage to see if a valid token exists and return it.
          // When no valid token is in the cache, it attempts to use its refresh token to get the token.
          .acquireTokenSilent(accessTokenRequest)
          .then(response => {
            if (scopes === SCOPES.CUSTOM)
              dispatch(userActions.setAccessToken(response.accessToken));
            else dispatch(userActions.setGraphToken(response.accessToken));
            setToken(response.accessToken);
          })
          .catch(error => {
            console.error(error);
          });
      }
    } catch (error) {
      // Some cookies or popup errors
      if (error instanceof InteractionRequiredAuthError) {
        instance
          .acquireTokenRedirect(accessTokenRequest)
          .then(response => {
            if (scopes === SCOPES.CUSTOM)
              dispatch(userActions.setAccessToken(response.accessToken));
            else dispatch(userActions.setGraphToken(response.accessToken));
            setToken(response.accessToken);
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
    return () => {
      subscription = false;
    };
  }, [instance, accounts, inProgress]);

  return token;
};
