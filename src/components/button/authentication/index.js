import React from "react";
import {
  useMsal,
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

import Base from "../base";
import { loginRequest, logoutRequest } from "../../../config/authentication";
import { connect } from "react-redux";
import { meetingActions } from "../../../state/actions";

const Authentication = () => {
  const { instance } = useMsal();

  const SignInButton = () => {
    return (
      <Base
        text="Sign in with Microsoft"
        icon="microsoft"
        classname="baseButton--login"
        onClickHandler={() => signInClickHandler(instance)}
      />
    );
  };

  const SignOutButton = () => {
    return <li onClick={() => signOutClickHandler(instance)}>Logout</li>;
  };

  const signInClickHandler = async (instance) => {
    instance.loginRedirect(loginRequest).catch((e) => { // Lets user select an account
      console.error(e);
    });
  };

  const signOutClickHandler = (instance) => {
    instance.logoutRedirect(logoutRequest).catch((e) => {
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

const mapDispatchToProps = (dispatch) => {
  return {
    clearUserProfile: () => {
      dispatch(meetingActions.clearUserProfile());
    },
  };
};

export default connect(null, mapDispatchToProps)(Authentication);
