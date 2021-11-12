import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

import { Spinner, ProgressBar } from "react-bootstrap";

import CreatableSelect from "react-select/creatable";
import FormHelperText from "@mui/material/FormHelperText";

import axios from "axios";

// const options = [
//   { value: "VMWare", label: "VMWare" },
//   { value: "Avlara", label: "Avlara" },
//   { value: "Nuclei", label: "Nuclei" },
// ];

let companies = [];

export const About = ({ formData, setForm, navigation, state }) => {
  const [load, setLoad] = useState(0);
  const [filled, setFilled] = useState(false);

  const { company, profile, tags, title } = formData;

  let handleChange = (newValue, actionMeta) => {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    if (newValue) {
      setForm({
        target: {
          name: "company",
          value: newValue.value,
        },
      });
    }
  };

  let handleInputChange = (inputValue, actionMeta) => {
    console.group("Input Changed");
    console.log(inputValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
  };

  let checkValues = () => {
    console.log(company);
    console.log(profile);
    console.log(title);
    if (
      company.trim() === "Select Compnay from given or Create New" ||
      profile.trim() === "" ||
      title.trim() === ""
    ) {
      setFilled(false);
      return;
    }
    setFilled(true);
  };

  useEffect(() => {
    checkValues();
    //eslint-disable-next-line
  }, [formData]);

  useEffect(() => {
    let values = [];
    const config = {
      headers: {
        Authorization: `Bearer ${state.id_token}`,
      },
    };
    axios
      .get("/company", config)
      .then((response) => {
        console.log(response.data);
        response.data.forEach(myFunction);
        function myFunction(item) {
          values.push({ value: item, label: item });
        }
        companies = values;
        console.log(companies);
        console.log(values);
        setLoad(1);
      })
      .catch((error) => {
        console.log(error);
        setLoad(2);
      });
    //eslint-disable-next-line
  }, []);

  if (load === 0) {
    return (
      <>
        <div className="d-flex justify-content-center m-5">
          <Spinner animation="border" variant="primary" size="lg" />
          <h1 className="mt-5">Loading</h1>
        </div>
      </>
    );
  } else if (load === 2) {
    return (
      <>
        <div className="d-flex justify-content-center m-5">
          <h1>Error in Loading Form </h1>
        </div>
      </>
    );
  }
  return (
    <div className="mt-2">
      <ProgressBar
        animated
        now={33}
        label="Step 1 / 3"
        variant="success"
        className="mb-3"
      />
      <Container maxWidth="lg">
        <h3>About Company</h3>
        <TextField
          label="Title"
          name="title"
          value={title}
          onChange={setForm}
          margin="normal"
          variant="standard"
          autoComplete="off"
          fullWidth
        />
        <TextField
          label="Profile"
          name="profile"
          value={profile}
          onChange={setForm}
          margin="normal"
          variant="standard"
          fullWidth
        />
        <TextField
          label="Tags separated by comma"
          name="tags"
          value={tags}
          onChange={setForm}
          margin="normal"
          variant="standard"
          autoComplete="off"
          fullWidth
        />

        <FormHelperText>Add Company Name</FormHelperText>
        <CreatableSelect
          defaultValue={{ value: company, label: company }}
          onChange={handleChange}
          onInputChange={handleInputChange}
          options={companies}
        />

        <Button
          variant="contained"
          fullWidth
          color="primary"
          style={{ marginTop: "1rem" }}
          onClick={() => navigation.next()}
          disabled={!filled}
        >
          {filled && "NEXT"}
          {!filled && "Please Fill to Go to Next Step"}
        </Button>
      </Container>
    </div>
  );
};
