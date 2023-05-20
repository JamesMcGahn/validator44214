import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './header.css';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);

  console.log(token);

  const handleNavLinkClick = (path) => {
    navigate(path);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isActive ? 'top-nav-link active' : 'top-nav-link'
          }
        >
          <Navbar.Brand>214 Validator</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto main-links">
            <Nav.Item className="px-4">
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isActive ? 'top-nav-link active' : 'top-nav-link'
                }
              >
                Upload File
              </NavLink>
            </Nav.Item>
            <Nav.Item className="px-4">
              <NavLink
                to="/read"
                className={({ isActive, isPending }) =>
                  isActive ? 'top-nav-link active' : 'top-nav-link'
                }
              >
                Read File
              </NavLink>
            </Nav.Item>
            <Nav.Item className="px-4">
              <NavLink
                to="/validate"
                className={({ isActive, isPending }) =>
                  isActive ? 'top-nav-link active' : 'top-nav-link'
                }
              >
                Validate File
              </NavLink>
            </Nav.Item>
          </Nav>

          <Nav>
            {token ? (
              <Nav.Item className="px-4">
                <NavLink
                  to="/login"
                  className={({ isActive, isPending }) =>
                    isActive ? 'top-nav-link active' : 'top-nav-link'
                  }
                >
                  Login
                </NavLink>
              </Nav.Item>
            ) : (
              <Nav.Item className="px-4">
                <NavLink
                  to="/register"
                  className={({ isActive, isPending }) =>
                    isActive ? 'top-nav-link active' : 'top-nav-link'
                  }
                >
                  Register
                </NavLink>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
