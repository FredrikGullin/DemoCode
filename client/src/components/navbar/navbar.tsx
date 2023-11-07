import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import logoutUser from "../../services/logoutUser";
import { useAuth } from "../../context/authContext";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./navbar.css";

const AppNavbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [navbarExpanded, setNavbarExpanded] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("accessToken");
  const isLoggedIn = Boolean(token);
  const { logout, userId } = useAuth();

  const handleLogout = async () => {
    if (token) {
      try {
        await logoutUser(token);
        logout();
        navigate("/");
        toast.success("You've been logged out!");
      } catch (error) {
        toast.error("An error occured while loggin out!");
      }
    }
  };

  const handleNavLinkClick = () => {
    setNavbarExpanded(false);
  };

  const handleDropdownToggle = (isOpen: boolean) => {
    setDropdownOpen(isOpen);
    if (!isOpen) {
      handleNavLinkClick();
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) {
      toast.error("Please provide a search query!");
    } else {
      navigate("/search-results", { state: { searchQuery } });
      setSearchQuery("");
    }
  };

  return (
    <Navbar
      expand="lg"
      expanded={navbarExpanded}
      onToggle={() => setNavbarExpanded(!navbarExpanded)}
      className="bg-body-tertiary fixed-top"
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to={isLoggedIn ? "/dashboard" : "/"}
          onClick={handleNavLinkClick}
        >
          Appeggio
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          onClick={() => setNavbarExpanded(!navbarExpanded)}
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to={"/news"} onClick={handleNavLinkClick}>
              News
            </Nav.Link>
            <Nav.Link as={Link} to="/courses" onClick={handleNavLinkClick}>
              Courses
            </Nav.Link>
            <NavDropdown
              title="Student"
              id="navbarScrollingDropdown"
              show={dropdownOpen}
              onToggle={handleDropdownToggle}
            >
              {isLoggedIn ? (
                <>
                  <NavDropdown.Item
                    as={Link}
                    to={`/profile/${userId}`}
                    onClick={handleNavLinkClick}
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/my-courses"
                    onClick={handleNavLinkClick}
                  >
                    My Courses
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/dashboard"
                    onClick={handleNavLinkClick}
                  >
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item as={Link} to="/" onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item
                    as={Link}
                    to="/"
                    onClick={handleNavLinkClick}
                    disabled
                  >
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/my-courses"
                    onClick={handleNavLinkClick}
                    disabled
                  >
                    My Courses
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/dashboard"
                    onClick={handleNavLinkClick}
                    disabled
                  >
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={Link}
                    to="/login"
                    onClick={handleNavLinkClick}
                  >
                    Login
                  </NavDropdown.Item>
                </>
              )}
            </NavDropdown>
            <Nav.Link as={Link} to="/about" onClick={handleNavLinkClick}>
              About
            </Nav.Link>
          </Nav>
          <Form onSubmit={handleSearch} className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="me-2"
              aria-label="Search"
            />
            <Button
              type="submit"
              variant="primary"
              onClick={handleNavLinkClick}
            >
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
