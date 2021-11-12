import Container from "@mui/material/Container";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Badge, Spinner } from "react-bootstrap";

import PostList from "../Post/PostList";

import axios from "axios";

let SearchResult = ({ state }) => {
  const { id } = useParams();

  const [load, setLoad] = useState(0);

  const [company, setCompany] = useState("");
  const [posts, setPosts] = useState(null);

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
        setCompany(id);
        setPosts(response.data);
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
          <h1 className="mt-5">Loading Experiences {id}</h1>
        </div>
      </>
    );
  } else if (load === 2) {
    return (
      <>
        <div className="d-flex justify-content-center m-5">
          <h1>Error in Loading Experiences of {id} </h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Container fluid>
          <header className="mt-2">
            <div className="container text-center">
              <div className="logo">
                <h1>
                  <b>
                    <Badge pill bg="info" text="dark">
                      {" "}
                      {company}{" "}
                    </Badge>
                    {" Experiences "}
                  </b>
                </h1>
              </div>
            </div>
          </header>
          <PostList posts={posts} />
        </Container>
      </>
    );
  }
};

export default SearchResult;
