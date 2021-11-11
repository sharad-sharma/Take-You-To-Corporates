import Container from "@mui/material/Container";

import React, { useState, useEffect } from "react";

import { Spinner } from "react-bootstrap";

import PostList from "./PostList";

import axios from "axios";

let SearchResult = ({ state }) => {
  const [load, setLoad] = useState(0);

  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${state.id_token}`,
      },
    };
    axios
      .get(`/user/${state.user._id}/post/`, config)
      .then((response) => {
        console.log(response.data);
        setPosts(response.data.posts);
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
          <h3 className="my-3">Logged in Using {state.email}</h3>
          <Spinner animation="border" variant="primary" size="lg" />
          <h1 className="mt-5">Loading Experiences</h1>
        </div>
      </>
    );
  } else if (load === 2) {
    return (
      <>
        <div className="d-flex justify-content-center m-5">
          <h3 className="my-3">Logged in Using {state.email}</h3>
          <h1>Error in Loading Insights </h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Container fluid>
          <h3 className="my-3">Logged in Using {state.email}</h3>
          <hr />
          <h3 className="display-5">My Posts</h3>
          <div className="divider py-1 bg-secondary my-2"></div>
          <PostList posts={posts} />
        </Container>
      </>
    );
  }
};

export default SearchResult;
