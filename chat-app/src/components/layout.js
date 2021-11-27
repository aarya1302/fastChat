import axios from "axios";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
export default function Layout({ children }) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home" className="text-primary">
            Fast Chat
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <button
                  className="btn text-dark"
                  onClick={async () => {
                    var res = await axios.get("/signout");
                    if (res.data.message === "redirect") {
                      window.location = "/login";
                    }
                  }}
                >
                  logout
                </button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {window.innerWidth < 900 ? (
        <main>{children}</main>
      ) : (
        <div className="container-fluid mt-2">
          <main>{children}</main>
        </div>
      )}
    </>
  );
}
