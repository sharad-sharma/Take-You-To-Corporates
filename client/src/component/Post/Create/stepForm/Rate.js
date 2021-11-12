import React from "react";

import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { ProgressBar } from "react-bootstrap";

import axios from "axios";

export const Rate = ({ formData, setForm, navigation, state }) => {
  const {
    company,
    profile,
    title,
    tags,

    experience,

    dataStructuresAndAlgoriths,
    dbms,
    operatingSystems,
    computerNetworks,
    systemDesign,
    aptitude,
    communicationSkills,
  } = formData;

  let data = {
    company: company,
    profile: profile,
    title: title,
    tags: tags,

    experience: experience,

    ratings: {
      dataStructuresAndAlgoriths,
      dbms,
      operatingSystems,
      computerNetworks,
      systemDesign,
      aptitude,
      communicationSkills,
    },
  };

  let submitHandler = () => {
    console.log(data);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.id_token}`,
      },
    };

    axios
      .post("/post", data, config)
      .then((response) => {
        console.log(response.data);
        navigation.next();
      })
      .catch((error) => {
        console.log(error);
        alert("Error Submitting Form");
      });
  };

  return (
    <div className="mt-2">
      <ProgressBar
        animated
        now={99}
        label="Step 3 / 3"
        variant="success"
        className="mb-3"
      />
      <Container maxWidth="lg">
        <h3>Rate Difficulty</h3>
        <Alert severity="info" className="my-2">
          {" Rate Following Subjects based on your experience "}
          {" From 1 (easy) to 10 (extremely hard)"}
        </Alert>
        <TextField
          label="Data Structures And Algoriths"
          name="dataStructuresAndAlgoriths"
          value={dataStructuresAndAlgoriths}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
          type="number"
          InputProps={{
            inputProps: {
              max: 10,
              min: 1,
            },
          }}
        />
        <TextField
          label="DBMS"
          name="dbms"
          value={dbms}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
          type="number"
          InputProps={{
            inputProps: {
              max: 10,
              min: 1,
            },
          }}
        />
        <TextField
          label="Operating Systems"
          name="operatingSystems"
          value={operatingSystems}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
          type="number"
          InputProps={{
            inputProps: {
              max: 10,
              min: 1,
            },
          }}
        />
        <TextField
          label="Computer Networks"
          name="computerNetworks"
          value={computerNetworks}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
          type="number"
          InputProps={{
            inputProps: {
              max: 10,
              min: 1,
            },
          }}
        />
        <TextField
          label="System Design & Development Skills"
          name="systemDesign"
          value={systemDesign}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
          type="number"
          InputProps={{
            inputProps: {
              max: 10,
              min: 1,
            },
          }}
        />
        <TextField
          label="Aptitude"
          name="aptitude"
          value={aptitude}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
          type="number"
          InputProps={{
            inputProps: {
              max: 10,
              min: 1,
            },
          }}
        />
        <TextField
          label="Communication Skills"
          name="communicationSkills"
          value={communicationSkills}
          onChange={setForm}
          margin="normal"
          variant="outlined"
          autoComplete="off"
          fullWidth
          type="number"
          InputProps={{
            inputProps: {
              max: 10,
              min: 1,
            },
          }}
        />
        <div style={{ marginTop: "1rem" }}>
          <Button
            color="secondary"
            variant="contained"
            style={{ marginRight: "1rem" }}
            onClick={() => navigation.previous()}
          >
            Back
          </Button>
          <Button color="primary" variant="contained" onClick={submitHandler}>
            Submit
          </Button>
        </div>
      </Container>
    </div>
  );
};
