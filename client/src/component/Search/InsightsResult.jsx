import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { Badge, Spinner, Container } from "react-bootstrap";

import Insights from "./Insights";

import axios from "axios";

let InsightsResults = ({ state }) => {
  const [company, setCompany] = useState("");
  const [number, setNumber] = useState(0);
  const [cardsData, setCardData] = useState(null);

  const [load, setLoad] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${state.id_token}`,
      },
    };
    axios
      .get(`/company/${id}/insights`, config)
      .then((response) => {
        console.log(response.data);
        setCompany(response.data.name);
        setNumber(response.data.number);
        setCardData(response.data.cardsData);
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
          <h1 className="mt-5">Loading Insights {id}</h1>
        </div>
      </>
    );
  } else if (load === 2) {
    return (
      <>
        <div className="d-flex justify-content-center m-5">
          <h1>Error in Loading Insights {id}</h1>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Container>
          <header>
            <div className="container text-center">
              <div className="logo">
                <h1>
                  <b>
                    <Badge pill bg="info" text="dark">
                      {" "}
                      {company}{" "}
                    </Badge>
                    {" Insights "}
                  </b>
                </h1>
              </div>
              <h2>
                {"Based on "}
                <Badge pill bg="info" text="dark">
                  {number}
                </Badge>
                {" Records "}
              </h2>
            </div>
          </header>
          <Insights cardsData={cardsData} />
        </Container>
      </>
    );
  }
};

export default InsightsResults;
