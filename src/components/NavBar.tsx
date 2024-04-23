import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { IoBagOutline } from "react-icons/io5";
import { LinkContainer } from "react-router-bootstrap";

function NavBar() {
  return (
    <Navbar className="navbar-custom" expand="lg">
      <Container>
        <LinkContainer to="/~24SP_jacksonja13/home">
          <Navbar.Brand className="navbar-brand-centered navbar-brand">
            Thrifty
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <NavDropdown title="Women" id="basic-nav-dropdown">
                <LinkContainer to="/~24SP_jacksonja13/women/bottoms">
                  <NavDropdown.Item>Bottoms</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/~24SP_jacksonja13/women/dresses">
                  <NavDropdown.Item>Dresses</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/~24SP_jacksonja13/women/tops">
                  <NavDropdown.Item>Tops</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/~24SP_jacksonja13/women/outerwear">
                  <NavDropdown.Item>Outerwear</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/~24SP_jacksonja13/women/bags">
                  <NavDropdown.Item>Bags</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/~24SP_jacksonja13/women/sneakers">
                  <NavDropdown.Item>Sneakers</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/~24SP_jacksonja13/women/accessories">
                  <NavDropdown.Item>Accessories</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav.Item>
            <Nav.Item>
              <NavDropdown title="Men" id="basic-nav-dropdown">
                <LinkContainer to="/~24SP_jacksonja13/men/bottoms">
                  <NavDropdown.Item>Bottoms</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/~24SP_jacksonja13/men/tops">
                  <NavDropdown.Item>Tops</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/~24SP_jacksonja13/men/outerwear">
                  <NavDropdown.Item>Outerwear</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/~24SP_jacksonja13/men/sneakers">
                  <NavDropdown.Item>Sneakers</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/~24SP_jacksonja13/men/accessories">
                  <NavDropdown.Item>Accessories</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/~24SP_jacksonja13/community">
                <Nav.Link>Community</Nav.Link>
              </LinkContainer>
            </Nav.Item>
          </Nav>
          <Nav>
            <Nav.Item>
              <LinkContainer to="/~24SP_jacksonja13/sell">
                <Nav.Link>Sell</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/~24SP_jacksonja13/account">
                <Nav.Link>Account</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/~24SP_jacksonja13/cart">
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