import React from "react";
import { Button } from "../../components";
import "./style.scss";

const Login = () => {
  return (
    <div className="login">
      <img src="logo-white.png" />
      <div className="segment login__segment">
        <h3 id="login__title">Login to ConnectUs</h3>
        <Button.Authentication />
      </div>
      <div className="login__text">
        <p>
          By logging in you agree to our <span>terms & conditions</span>
        </p>
        <p>
          and <span>privacy policy</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
