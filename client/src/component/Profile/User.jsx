// import Container from "@mui/material/Container";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Spinner, Container } from "react-bootstrap";

import PostList from "./PostList";

import axios from "axios";

let SearchResult = ({ state }) => {
  const { id } = useParams();

  const [load, setLoad] = useState(0);

  const [user, setUser] = useState(null);

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
        setUser(response.data.user);
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
          <h1 className="mt-5">Loading Profile {id}</h1>
        </div>
      </>
    );
  } else if (load === 2) {
    return (
      <>
        <div className="d-flex justify-content-center m-5">
          <h1>Error in Loading Profile of {id} </h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Container className="my-3">
          <h3 className="display-6">User Profile Id - {id} </h3>
          <div className="divider py-1 bg-secondary my-2"></div>
          <div className="d-flex justify-content-center my-5">
            <div className="col-md-10 ">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Full Name</h6>
                    </div>
                    <div className="col-sm-5 text-secondary">{user.name}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Primary Email</h6>
                    </div>
                    <div className="col-sm-5 text-secondary">
                      {user.primaryEmail}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Secondary Email</h6>
                    </div>
                    <div className="col-sm-5 text-secondary">
                      {user.secondaryEmail}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Admission Year</h6>
                    </div>
                    <div className="col-sm-5 text-secondary">{user.year}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Branch</h6>
                    </div>
                    <div className="col-sm-5 text-secondary">{user.branch}</div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-5">
                      <h6 className="mb-0">Secondary Email</h6>
                    </div>
                    <div className="col-sm-5 text-secondary">
                      {user.secondaryEmail}
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="display-5">Posts - </h3>
              <hr />
              <PostList posts={user.posts} />
            </div>
          </div>
        </Container>
      </>
    );
  }
};

export default SearchResult;