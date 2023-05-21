import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Read from './pages/Read';
import Login from './pages/Login';
import Validate from './pages/Validate';
import PrivateRoute from './components/utils/PrivateRoute';
import { useSelector, useDispatch } from 'react-redux';
import { loggedIn, reset } from './features/auth/authSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user?.token) {
      dispatch(loggedIn());
      dispatch(reset());
    }
    // trunk-ignore(eslint/react-hooks/exhaustive-deps)
  }, []);

  return (
    <>
      <Router>
        <Header />
        <Container className="main-container">
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/read"
              element={
                <PrivateRoute>
                  <Read />
                </PrivateRoute>
              }
            />
            <Route
              path="/validate"
              element={
                <PrivateRoute>
                  <Validate />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Container>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
