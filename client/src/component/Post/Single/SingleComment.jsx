import React, { useState } from "react";

import IconButton from "@mui/material/IconButton";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { Badge } from "react-bootstrap";

import _ from "lodash";

import axios from "axios";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function App({ comment, postId, id, state }) {
  const [like, setLike] = useState(comment.likes.includes(state.user._id));
  const [numberOfLikes, setNumberOfLikes] = useState(comment.likes.length);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deletePost = () => {
    handleClose();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.id_token}`,
      },
    };
    axios
      .delete(`/post/${postId}/comment/${id}`, config)
      .then((response) => {
        console.log(response.data);
        alert("Comment Deleted ");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Error Submitting Form");
      });
  };

  let likeToggleHandler = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.id_token}`,
      },
    };
    if (like) {
      axios
        .post(`/post/comment/${id}/toggleLike`, {}, config)
        .then((response) => {
          setLike(false);
          setNumberOfLikes(numberOfLikes - 1);
        })
        .catch((error) => {
          alert("Eroor");
        });
    } else {
      axios
        .post(`/post/comment/${id}/toggleLike`, {}, config)
        .then((response) => {
          setLike(true);
          setNumberOfLikes(numberOfLikes + 1);
        })
        .catch((error) => {
          alert("Error");
        });
    }
  };

  return (
    <div key={comment._id}>
      <h6 style={{ color: "#464761" }}>
        {comment.text}
        {comment.user._id === state.user._id && (
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
      </h6>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do You Want to Delete This comment ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This is un recoverable action resulting in deletion of this comment
            with all its likes.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={deletePost} autoFocus>
            Accept & Delete
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        <span className="span-with-margin f5 text-grey">
          {_.upperFirst(comment.user.name)}
        </span>
        <span className="span-with-margin f5 text-grey"> • </span>
        <span className="span-with-margin f5 text-grey">
          {new Date(
            parseInt(comment._id.substring(0, 8), 16) * 1000
          ).toLocaleString()}
        </span>
      </div>
      <IconButton onClick={likeToggleHandler}>
        {!like && <ThumbUpAltOutlinedIcon color="info" />}
        {like && <ThumbUpIcon color="info" />}
      </IconButton>
      <Badge bg="info">{numberOfLikes}</Badge>
      <hr />
    </div>
  );
}

export default App;
