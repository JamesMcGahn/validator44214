import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { logout, reset } from '../../features/auth/authSlice';
import './header.css';

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(logout());
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
            {!user?.token ? (
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
                  to="/login"
                  onClick={handleLogOut}
                  className={({ isActive, isPending }) =>
                    isActive ? 'top-nav-link active' : 'top-nav-link'
                  }
                >
                  Logout
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
