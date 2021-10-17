import React  from "react";
import { Container } from "react-bootstrap";
import { NavDropdown,Nav,Navbar,Form,FormControl,Button } from "react-bootstrap";
import {Link} from 'react-router-dom'
const NavBar =()=>{
    return(
        <div>
            <Navbar bg="light" expand="lg">
            <Container>
                {/* <Navbar.Brand href="#home">Take you to corporate</Navbar.Brand> */}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/profile">My Profile</Nav.Link>
                    <Nav.Link href="/create">Create Post</Nav.Link>
                    <Nav.Link href="/myfollowing">My Following</Nav.Link>
                </Nav>
                <Form className="d-flex">
                    <FormControl
                    type="search"
                    placeholder="Search By tags"
                    className="me-2"
                    aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>
    )
}
export default NavBar