import React, { useState, useEffect } from "react";

import axios from "axios";

import { Spinner } from "react-bootstrap";

import PostList from "../Post/PostList";

let SearchResult = ({ state }) => {
  const [load, setLoad] = useState(0);
  const [posts, setPost] = useState(null);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${state.id_token}`,
      },
    };
    axios
      .get("post", config)
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
        <div className="d-flex m-5">
          <h1>Error in Loading Home Page </h1>
        </div>
      </>
    );
  }
  return (
    <div className="post">
      {posts.length !== 0 && (
        <>
          <h3 className="display-6">Recent Posts</h3>
          <div className="divider py-1 bg-secondary my-2"></div>
          <PostList posts={posts} />
        </>
      )}
      {posts.length === 0 && <h3>No Posts To Display</h3>}
    </div>
  );
};

export default SearchResult;
