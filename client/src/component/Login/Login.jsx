import React from "react";

import { Container } from "react-bootstrap";

import { GoogleLogin } from "react-google-login";

import axios from "axios";

const Login = ({ stateSeter }) => {
  const loginFail = (response) => {
    console.log("Login Failed");
    console.log(response);
  };

  const loginSuccess = (response) => {
    console.log("Login Success");
    console.log(response);

    let email = response.profileObj.email;
    let id_token = response.tokenObj.id_token;
    let backendData = {
      id_token,
      email,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("/user/auth", backendData, config)
      .then((response) => {
        console.log(response.data);
        if (response.data.user) {
          let state = {
            user: response.data.user,
            isProfileComplete: true,
            id_token,
            email,
          };
          localStorage.setItem("state", JSON.stringify(state));
          stateSeter(state);
        } else {
          let state = {
            user: null,
            isProfileComplete: false,
            id_token,
            email,
          };
          localStorage.setItem("state", JSON.stringify(state));
          stateSeter(state);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error Verifying Form");
      });
  };

  return (
    <Container>
      <h3 className="display-3">You are Not Logged In</h3>

      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
        buttonText="Login With College Mail"
        onSuccess={loginSuccess}
        onFailure={loginFail}
        redirectUri={process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URI}
        hostedDomain={process.env.REACT_APP_GOOGLE_OAUTH_HOSTED_DOMAIN}
        isSignedIn={true}
      />
    </Container>
  );
};

export default Login;
