import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import axios from "axios";

const Header = ({ stateSeter, state }) => {
  const bracnches = [
    {
      value: "CS",
      label: "CS",
    },
    {
      value: "IT",
      label: "IT",
    },
    {
      value: "ETC",
      label: "ETC",
    },
    {
      value: "EI",
      label: "EI",
    },
    {
      value: "CE",
      label: "CE",
    },
    {
      value: "ME",
      label: "ME",
    },
  ];

  const [secondaryEmail, setSecondaryEmail] = useState(
    state.user ? state.user.secondaryEmail : ""
  );
  const [name, setName] = useState(state.user ? state.user.name : "");
  const [year, setYear] = useState(state.user ? state.user.year : 2018);
  const [branch, setBranch] = useState(state.user ? state.user.branch : "");

  const branchHandleChange = (event) => {
    setBranch(event.target.value);
  };
  const yearHandleChange = (event) => {
    setYear(event.target.value);
  };
  const nameHandleChange = (event) => {
    setName(event.target.value);
  };
  const secondaryEmailHandleChange = (event) => {
    setSecondaryEmail(event.target.value);
  };

  let submitHandler = () => {
    if (
      secondaryEmail !== "" &&
      branch &&
      name !== "" &&
      year < 2030 &&
      year > 2010 &&
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(secondaryEmail)
    ) {
      let data = {
        user: {
          primaryEmail: state.email,
          secondaryEmail,
          name,
          year,
          branch,
        },
        id_token: state.id_token,
      };
      console.log(data);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      axios
        .post("/user/add", data, config)
        .then((response) => {
          console.log(response.data);
          if (response.data.user) {
            let state2 = {
              user: response.data.user,
              isProfileComplete: true,
              id_token: state.id_token,
              email: state.email,
            };
            localStorage.setItem("state", JSON.stringify(state2));
            stateSeter(state2);
            alert("Data Added Successfully");
          } else {
            alert("Please Re-Login and Submit Again !!");
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Error Submitting Form");
        });
    } else {
      alert("Please Enter Valid Details !!");
    }
  };

  return (
    <>
      <h2 className="text-center">Your Details</h2>
      <TextField
        label="Primary Email"
        name="primaryyEmail"
        disabled
        defaultValue={state.email}
        variant="standard"
        margin="normal"
        fullWidth
      />
      <TextField
        label="Your Secondary Email"
        name="secondaryEmail"
        value={secondaryEmail}
        onChange={secondaryEmailHandleChange}
        margin="normal"
        variant="standard"
        fullWidth
      />
      <TextField
        label="Your Full Name"
        name="name"
        value={name}
        onChange={nameHandleChange}
        margin="normal"
        variant="standard"
        fullWidth
      />
      <TextField
        label="Admission Year"
        name="year"
        value={year}
        onChange={yearHandleChange}
        margin="normal"
        variant="standard"
        fullWidth
        type="number"
        InputProps={{
          inputProps: {
            max: 2025,
            min: 2015,
          },
        }}
      />
      <TextField
        select
        label="Branch"
        value={branch}
        variant="standard"
        fullWidth
        onChange={branchHandleChange}
      >
        {bracnches.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>

      <Button
        variant="contained"
        fullWidth
        color="primary"
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
        onClick={submitHandler}
      >
        {state.user && "Update Details"}
        {!state.user && "Submit Details"}
      </Button>
    </>
  );
};

export default Header;
