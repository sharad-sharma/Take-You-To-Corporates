import React from "react";

import MarkdownEditor from "@uiw/react-markdown-editor";

import Alert from "@mui/material/Alert";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import { ProgressBar } from "react-bootstrap";

export const Experience = ({ formData, setForm, navigation }) => {
  const { experience } = formData;

  let handleChange = (value) => {
    setForm({
      target: {
        name: "experience",
        value: value,
      },
    });
  };

  return (
    <div className="mt-2">
      <ProgressBar
        animated
        now={67}
        label="Step 2 / 3"
        variant="success"
        className="mb-3"
      />
      <Container maxWidth="lg">
        <h3>Add Your Experience</h3>
        <Alert severity="info" className="my-2">
          {" Please Use Url To add Images "}
          <Link href="https://bbcode0.com/" underline="hover" target="_blank">
            {" You Can Use This "}
          </Link>
          {" Or "}
          <Link
            href="https://postimages.org/"
            underline="hover"
            target="_blank"
          >
            {" This "}
          </Link>
        </Alert>

        <MarkdownEditor
          height={500}
          tabSize={4}
          visible={true}
          value={experience}
          onChange={(editor, data, value) => handleChange(value)}
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
          <Button
            color="primary"
            variant="contained"
            onClick={() => navigation.next()}
          >
            Next
          </Button>
        </div>
      </Container>
    </div>
  );
};
