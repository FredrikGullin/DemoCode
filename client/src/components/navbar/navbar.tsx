import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navbar.css";

function NavScroll() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          Appeggio
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Courses
            </Nav.Link>
            <NavDropdown title="Student" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/" disabled>
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/" disabled>
                My courses
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/login">
                Login
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/">
              About
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScroll;
