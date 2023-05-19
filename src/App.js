import React, { useEffect } from "react";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import { connect } from "react-redux";
import {
  MsalAuthenticationTemplate,
  AuthenticatedTemplate,
  useIsAuthenticated,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import {
  Agenda,
  Employees,
  Home,
  History,
  Loading,
  Login,
  Meetings,
  Error,
  Message,
  Onboarding,
  NotFound,
  Profile,
  Terms,
} from "./screens";

import {
  employeeActions,
  meetingActions,
  userActions,
  navigationActions,
} from "./state/actions";
import { useGetToken } from "./hooks";
import { Navigation, Meeting } from "./components";
import { SCOPES, ROUTES } from "./constants";
import { loginRequest } from "./config/authentication";
import "./App.scss";

const SingleMeeting = () => {
  let { id } = useParams();
  return <Agenda id={id} />;
};

const Menus = () => {
  // const currentPath = window.location.pathname;
  // const routes = Object.values(ROUTES.CLIENT);
  // if (!routes.includes(currentPath)) return null;

  return (
    <>
      <Navigation.Sidebar />
      <Navigation.Topbar />
      <Meeting.CreateNew />
    </>
  );
};

const PrivateRoutes = () => {
  return (
    <Switch>
      <MsalAuthenticationTemplate
        interactionType={InteractionType.Redirect}
        authenticationRequest={loginRequest}
      >
        <Menus />
        <div className="content">
          <ToastContainer
            autoClose={4000}
            closeOnClick
            draggable
            pauseOnHover
          />
          <Route exact path={ROUTES.CLIENT.HOME}>
            <Home />
          </Route>
          <Route exact path={ROUTES.CLIENT.PROFILE}>
            <Profile />
          </Route>
          <Route exact path={ROUTES.CLIENT.MEETINGS}>
            <Meetings />
          </Route>
          <Route exact path={ROUTES.CLIENT.EMPLOYEES}>
            <Employees />
          </Route>
          <Route exact path={ROUTES.CLIENT.MEETINGS + "/:id"}>
            <SingleMeeting />
          </Route>
        </div>
        <Route exact path={ROUTES.CLIENT.HISTORY}>
          <History />
        </Route>
      </MsalAuthenticationTemplate>
    </Switch>
  );
};

const App = (props) => {
  const {
    fetchEmployee,
    fetchEmployees,
    fetchUserProfile,
    selected,
    profile,
    redirectTo,
    isNewUser,
  } = props;
  const accessToken = useGetToken(SCOPES.CUSTOM); // Token for backend application
  const graphToken = useGetToken(SCOPES.GRAPH); // Token for Graph API
  const isAuthenticated = useIsAuthenticated();

  const employeeExists = selected.error === undefined;

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
      if (employeeExists) {
        fetchEmployee(profile.id);
      } else {
        fetchEmployees();
      }
    }
  }, []);

  useEffect(() => {
    if (isNewUser) {
      const path = window.location.pathname;
      if (path !== ROUTES.CLIENT.ONBOARDING) {
        redirectTo(ROUTES.CLIENT.ONBOARDING);
      }
    }
  });

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [accessToken, graphToken]);

  useEffect(() => {
    if (isAuthenticated && employeeExists) {
      fetchEmployee(profile.id);
    }

    !employeeExists && fetchEmployees();
  }, [profile]);

  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.CLIENT.LOGIN}>
          {" "}
          <UnauthenticatedTemplate>
            <Login />
          </UnauthenticatedTemplate>
        </Route>
        <Route exact path={ROUTES.CLIENT.ONBOARDING}>
          <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={loginRequest}
          >
            <Onboarding />
          </MsalAuthenticationTemplate>
        </Route>
        <Route exact path={ROUTES.CLIENT.ERROR}>
          <AuthenticatedTemplate>
            <Error />
          </AuthenticatedTemplate>
        </Route>
        <Route exact path={ROUTES.CLIENT.LOADING}>
          <AuthenticatedTemplate>
            <Loading />
          </AuthenticatedTemplate>
        </Route>
        <Route exact path={ROUTES.CLIENT.TERMS}>
          <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={loginRequest}
          >
            <Terms />
          </MsalAuthenticationTemplate>
        </Route>
        <Route exact path={ROUTES.CLIENT.MESSAGE}>
          <MsalAuthenticationTemplate
            interactionType={InteractionType.Redirect}
            authenticationRequest={loginRequest}
          >
            <Message />
          </MsalAuthenticationTemplate>
        </Route>
        <Route component={PrivateRoutes} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => {
  const {
    user: { profile },
    employee: { selected },
    user: { isNewUser },
  } = state;

  return { profile, selected, isNewUser };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllMeetings: (id) => dispatch(meetingActions.fetchAllMeetings(id)),
    fetchEmployees: () => dispatch(employeeActions.fetchEmployees()),
    fetchEmployee: (employeeId) =>
      dispatch(employeeActions.fetchEmployee(employeeId)),
    fetchUserProfile: () => dispatch(userActions.fetchUserProfile),
    redirectTo: (path) => dispatch(navigationActions.redirect(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
