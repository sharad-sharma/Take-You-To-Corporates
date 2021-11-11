import React from "react";

import { LinkContainer } from "react-router-bootstrap";

import { Navbar, Nav, Container } from "react-bootstrap";

const App = () => {
  return (
    <Navbar bg="info" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Take You To Corporates</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <LinkContainer exact to="/">
              <Nav.Link>
                <i className="fas fa-user"></i> Profile
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default App;
