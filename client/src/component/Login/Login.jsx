import React from "react";

import { Container } from "react-bootstrap";

import { GoogleLogin } from "react-google-login";

import axios from "axios";

const Login = ({ stateSeter }) => {
  const loginFail = (response) => {
    console.log("Login Failed");
    //console.log(response);
  };

  const loginSuccess = (response) => {
    console.log("Login Success");
    //console.log(response);

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
        //console.log(response.data);
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
        alert("Error Verifying Form / Use College Email");
      });
  };

  return (
    <Container>
      {/* <h3 className="display-3">You are Not Logged In</h3> */}
      <body class="text-center">

        <div class="d-flex justify-content-md-center align-items-center vh-100">


          <main role="main" class="inner cover">

            <h1 className="display-5">Take You To  Corporates</h1>
            <br></br>
            <p class="lead">A complete web solution for students of IET-DAVV to access all on-campus Interview experiences. </p>

            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
              buttonText={bt}
              onSuccess={loginSuccess}
              onFailure={loginFail}
              redirectUri={process.env.REACT_APP_GOOGLE_OAUTH_REDIRECT_URI}
              hostedDomain={process.env.REACT_APP_GOOGLE_OAUTH_HOSTED_DOMAIN}
              isSignedIn={true}
            />
          </main>

        </div>

      </body>


    </Container>
  );
};

export default Login;