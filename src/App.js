/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { useIsAuthenticated } from '@azure/msal-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

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
} from './screens';

import {
  employeeActions,
  meetingActions,
  userActions,
  navigationActions,
} from './state/actions';
import { useGetToken } from './hooks';
import { Navigation, Meeting } from './components';
import { SCOPES, ROUTES } from './constants';
import './App.scss';

const SingleMeeting = () => {
  let { id } = useParams();
  return <Agenda id={id} />;
};

const Menus = () => {
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
      <div>
        <div className='content'>
          <ToastContainer
            autoClose={4000}
            closeOnClick
            draggable
            pauseOnHover
          />

          <Route exact path={ROUTES.CLIENT.HOME}>
            <Menus />
            <Home />
          </Route>
          <Route exact path={ROUTES.CLIENT.PROFILE}>
            <Menus />
            <Profile />
          </Route>
          <Route exact path={ROUTES.CLIENT.MEETINGS}>
            <Menus />
            <Meetings />
          </Route>
          <Route exact path={ROUTES.CLIENT.EMPLOYEES}>
            <Menus />
            <Employees />
          </Route>
          <Route exact path={ROUTES.CLIENT.MEETINGS + '/:id'}>
            <Menus />
            <SingleMeeting />
          </Route>
        </div>
        <div style={{ paddingLeft: '15vw' }}>
          <Route exact path={ROUTES.CLIENT.HISTORY}>
            <Menus />
            <History />
          </Route>
        </div>
      </div>
    </Switch>
  );
};

const App = props => {
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

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetchUserProfile();
  //     if (employeeExists) {
  //       fetchEmployee(profile.id);
  //     } else {
  //       fetchEmployees();
  //     }
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isNewUser) {
  //     const path = window.location.pathname;
  //     if (path !== ROUTES.CLIENT.ONBOARDING) {
  //       redirectTo(ROUTES.CLIENT.ONBOARDING);
  //     }
  //   }
  // });

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     fetchUserProfile();
  //   }
  // }, [accessToken, graphToken]);

  // useEffect(() => {
  //   if (isAuthenticated && employeeExists) {
  //     fetchEmployee(profile.id);
  //   }

  //   !employeeExists && fetchEmployees();
  // }, [profile]);

  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.CLIENT.LOGIN}>
          {' '}
          <Login />
        </Route>
        <Route exact path={ROUTES.CLIENT.ONBOARDING}>
          <Onboarding />
        </Route>
        <Route exact path={ROUTES.CLIENT.ERROR}>
          <Error />
        </Route>
        <Route exact path={ROUTES.CLIENT.LOADING}>
          <Loading />
        </Route>
        <Route exact path={ROUTES.CLIENT.TERMS}>
          <Terms />
        </Route>
        <Route exact path={ROUTES.CLIENT.MESSAGE}>
          <Message />
        </Route>
        {/* <div className='content'>
          <Route exact path={ROUTES.CLIENT.HOME}>
            <Menus />
            <Home />
          </Route>
        </div> */}

        <Route component={PrivateRoutes} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

const mapStateToProps = state => {
  const {
    user: { profile },
    employee: { selected },
    user: { isNewUser },
  } = state;

  return { profile, selected, isNewUser };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllMeetings: id => dispatch(meetingActions.fetchAllMeetings(id)),
    fetchEmployees: () => dispatch(employeeActions.fetchEmployees()),
    fetchEmployee: employeeId =>
      dispatch(employeeActions.fetchEmployee(employeeId)),
    fetchUserProfile: () => dispatch(userActions.fetchUserProfile),
    redirectTo: path => dispatch(navigationActions.redirect(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
