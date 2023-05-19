import React, { useEffect } from "react";
import { useRedirect } from "../../hooks";
import { Redirect } from "react-router-dom";

const RedirectHelper = ({ children }) => {
  const redirectTo = useRedirect();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (redirectTo) {
    const redirectPath = redirectTo;
    return <Redirect to={redirectPath} />;
  }
  return children;
};

export default RedirectHelper;
