import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { IoBagOutline } from "react-icons/io5";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar() {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container>
        <Navbar.Brand
          href="#home"
          className="navbar-brand-centered navbar-brand"
        >
          Thrifty
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <NavDropdown title="Women" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Bottoms</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Dresses</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Tops</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  Outerwear
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.5">Bags</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.5">Sneakers</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.6">
                  Accessories
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
            <Nav.Item>
              <NavDropdown title="Men" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Bottoms</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Dresses</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Tops</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  Outerwear
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.5">Sneakers</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.6">
                  Accessories
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#sneakers">Community</Nav.Link>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              <Nav.Link href="sell">Sell</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="account">Account</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="account">
                <IoBagOutline size={25} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
