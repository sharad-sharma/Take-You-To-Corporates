import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import axios from "axios";

function App({ id, state }) {
  const [comment, setComment] = useState("");

  let handleChange = (event) => {
    setComment(event.target.value);
  };

  let handleSubmit = () => {
    let data = {
      user: "617946cb9949001941b8e2f2",
      text: comment,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.id_token}`,
      },
    };

    axios
      .post(`/post/comment/${id}`, data, config)
      .then((response) => {
        alert("Submit Successfully !!");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Error Submitting Form");
      });
  };
  return (
    <>
      <TextField
        label="Add Your New Comment"
        name="title"
        value={comment}
        onChange={handleChange}
        margin="normal"
        variant="outlined"
        autoComplete="off"
        fullWidth
      />
      <Button
        variant="contained"
        fullWidth
        color="primary"
        style={{ marginTop: "1rem" }}
        onClick={handleSubmit}
      >
        Submit Comment
      </Button>
    </>
  );
}

export default App;
