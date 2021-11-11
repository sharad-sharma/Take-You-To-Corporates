import React from "react";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const Submit = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: "4rem" }}>
      <h2>Thank you for submitting your Review !!</h2>
      <Button
        variant="contained"
        fullWidth
        color="primary"
        style={{ marginTop: "1rem" }}
      >
        <Link className="link-without-underline text-light" to={`/`}>
          Go Back To Home
        </Link>
      </Button>
    </Container>
  );
};
