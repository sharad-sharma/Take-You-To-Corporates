import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";

import Select from "react-select";

import { Button, Container, Spinner } from "react-bootstrap";

import axios from "axios";

let companies = [];

function Search({ state }) {
  let history = useHistory();

  const [load, setLoad] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);
  let getExperinces = () => {
    if (selectedOption) history.push(`/company/${selectedOption.value}`);
  };

  let getInsights = () => {
    if (selectedOption)
      history.push(`/company/${selectedOption.value}/insights`);
  };

  useEffect(() => {
    let values = [];
    const config = {
      headers: {
        Authorization: `Bearer ${state.id_token}`,
      },
    };
    axios
      .get("/company", config)
      .then((response) => {
        console.log(response.data);
        response.data.forEach(myFunction);
        function myFunction(item) {
          values.push({ value: item, label: item });
        }
        companies = values;
        console.log(companies);
        console.log(values);
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
          <h1>Error in Loading Company List</h1>
        </div>
      </>
    );
  }
  return (
    <>
      <Container>
        <div className="mt-2">
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={companies}
          />
        </div>
        <div className="d-grid gap-2 m-5">
          <Button variant="success" size="lg" onClick={getInsights}>
            Get Insights
          </Button>
          <Button variant="warning" size="lg" onClick={getExperinces}>
            Get Experiences
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Search;
