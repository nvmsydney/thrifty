import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { IoBagOutline } from "react-icons/io5";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logoutUser } from "../services/logout";

function NavBar() {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Assume false by default, set true if admin

  const handleLogout = () => {
    logoutUser();
    setUserLoggedIn(false);
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container>
        <LinkContainer to="/home">
          <Navbar.Brand className="navbar-brand-centered navbar-brand">
            Thrifty
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <LinkContainer to="/women">
                <Nav.Link>Women</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/men">
                <Nav.Link>Men</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/community">
                <Nav.Link>Community</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/searchbar">
                <Nav.Link>Search</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            { userLoggedIn && isAdmin && (
              <Nav.Item>
                <LinkContainer to="/admin">
                  <Nav.Link>Admin</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            )}
          </Nav>
          <Nav>
            <Nav.Item>
              <LinkContainer to="/sell">
                <Nav.Link>Sell</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <LinkContainer to="/view-profile">
                <NavDropdown.Item>View Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/edit-profile">
                <NavDropdown.Item>Edit Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={handleLogout}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Item>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <IoBagOutline size={25} />
                </Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
