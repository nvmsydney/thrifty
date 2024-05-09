import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { IoBagOutline } from "react-icons/io5";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { logoutUser } from "../services/logout";

function NavBar() {
  const navigate = useNavigate();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const usernameCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("username="))
      ?.split("=")[1];

    const fetchAdminStatus = async () => {
      try {
        const response = await fetch(
          "https://www.cmsc508.com/~24SP_jacksonja13/API.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              action: "GetAdminStatus",
              username: usernameCookie,
            }),
          }
        );
        const data = await response.json();
        console.log("API response:", data);
        if (data.success && data.is_admin) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Failed to fetch admin status:", error);
        setIsAdmin(false);
      }
    };

    fetchAdminStatus();
  }, []);

  if (isAdmin === undefined) {
    return <div>Loading... be patient</div>;
  }
  
  const handleLogout = () => {
    logoutUser();
    setUserLoggedIn(false);
    setIsAdmin(false);
    navigate("/~24SP_jacksonja13");
  };

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
              <LinkContainer to="/~24SP_jacksonja13/women">
                <Nav.Link>Women</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/~24SP_jacksonja13/men">
                <Nav.Link>Men</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/~24SP_jacksonja13/community">
                <Nav.Link>Community</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            { isAdmin && (
              <Nav.Item>
                <LinkContainer to="/~24SP_jacksonja13/admin">
                  <Nav.Link>Admin</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            )}
          </Nav>
          <Nav>
            <Nav.Item>
              <LinkContainer to="/~24SP_jacksonja13/sell">
                <Nav.Link>Sell</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <Nav.Item>
              <LinkContainer to="/~24SP_jacksonja13/searchbar">
                <Nav.Link>Search</Nav.Link>
              </LinkContainer>
            </Nav.Item>
            <NavDropdown title="Account" id="basic-nav-dropdown">
              <LinkContainer to="/~24SP_jacksonja13/view-profile">
                <NavDropdown.Item>View Profile</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/~24SP_jacksonja13/edit-profile">
                <NavDropdown.Item>Edit Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={handleLogout}>
                Log out
              </NavDropdown.Item>
            </NavDropdown>
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
