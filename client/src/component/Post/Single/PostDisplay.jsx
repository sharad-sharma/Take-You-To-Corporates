import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import Container from "@mui/material/Container";
import { Spinner } from "react-bootstrap";

import { PostBody } from "./PostBody";

import axios from "axios";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const PostDisplay = ({ state }) => {
  let history = useHistory();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePost = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.id_token}`,
      },
    };
    axios
      .delete(`/post/${id}`, config)
      .then((response) => {
        console.log(response.data);
        alert("Post Deleted ");
        history.push(`/`);
      })
      .catch((error) => {
        console.log(error);
        alert("Error Submitting Form");
      });
  };

  const { id } = useParams();

  const [load, setLoad] = useState(0);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${state.id_token}`,
      },
    };
    axios
      .get(`${id}`, config)
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
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
          <h1>Error in Loading Post </h1>
        </div>
      </>
    );
  }
  return (
    <>
      <Container maxWidth="lg" className="mt-3">
        <h3>
          Post Id - {id}{" "}
          {post.user._id === state.user._id && (
            <button
              className="btn btn-danger btn-sm rounded-0 float-right"
              type="button"
              data-toggle="tooltip"
              data-placement="top"
              title="Delete"
              onClick={handleClickOpen}
            >
              <i className="fa fa-trash"></i>
            </button>
          )}
        </h3>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Do You Want to Delete This Post ?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This is un recoverable action resulting in deletion of this post
              with all its comments.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={deletePost} autoFocus>
              Accept & Delete
            </Button>
          </DialogActions>
        </Dialog>

        <PostBody post={post} state={state} />
      </Container>
    </>
  );
};
