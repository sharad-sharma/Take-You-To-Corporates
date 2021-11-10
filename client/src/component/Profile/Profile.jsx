import React from "react";
import { useHistory } from "react-router-dom";

import { Container } from "react-bootstrap";
import { GoogleLogout } from "react-google-login";
import Form from "../Login/Form";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";

const Header = ({ state, stateSeter }) => {
  let history = useHistory();

  const logoutSuccess = (response) => {
    console.log("Logout Success");
    stateSeter(null);
    localStorage.removeItem("state");
  };

  let submitHandler = () => {
    history.push(`/mypost`);
  };

  return (
    <Container>
      <h3 className="display-4">Logged in Using {state.email}</h3>
      <GoogleLogout
        clientId="89660183822-jm6u5v7k8a364fefkj86l495j963kapc.apps.googleusercontent.com"
        buttonText="Logout"
        onLogoutSuccess={logoutSuccess}
        render={(renderProps) => (
          <Button
            variant="contained"
            fullWidth
            color="error"
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
            startIcon={<GoogleIcon />}
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Logout
          </Button>
        )}
      ></GoogleLogout>
      {state.isProfileComplete && (
        <Button
          variant="outlined"
          fullWidth
          color="warning"
          style={{ marginTop: "1rem", marginBottom: "1rem" }}
          onClick={submitHandler}
        >
          My Post
        </Button>
      )}
      <Form stateSeter={stateSeter} state={state} />
    </Container>
  );
};

export default Header;
