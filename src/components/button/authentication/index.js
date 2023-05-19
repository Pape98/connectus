import React from 'react';
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from '@azure/msal-react';

import Base from '../base';
import { loginRequest, logoutRequest } from '../../../config/authentication';
import { connect } from 'react-redux';
import { meetingActions } from '../../../state/actions';
import { Link } from 'react-router-dom';

const Authentication = () => {
  const { instance } = useMsal();

  const SignInButton = () => {
    return (
      <Link to='/terms'>
        <Base
          text='Click here to demo'
          icon='microsoft'
          classname='baseButton--login'
        />
      </Link>
    );
  };

  const SignOutButton = () => {
    return <li onClick={() => signOutClickHandler(instance)}>Logout</li>;
  };

  // eslint-disable-next-line no-unused-vars
  const signInClickHandler = async instance => {
    instance.loginRedirect(loginRequest).catch(e => {
      // Lets user select an account
      console.error(e);
    });
  };

  const signOutClickHandler = instance => {
    instance.logoutRedirect(logoutRequest).catch(e => {
      console.error(e);
    });
  };

  return (
    <>
      <AuthenticatedTemplate>
        <SignOutButton />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignInButton />
      </UnauthenticatedTemplate>
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    clearUserProfile: () => {
      dispatch(meetingActions.clearUserProfile());
    },
  };
};

export default connect(null, mapDispatchToProps)(Authentication);
