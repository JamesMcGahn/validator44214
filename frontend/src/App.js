import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import Header from './components/layout/Header';
import Home from './pages/Home';
import Read from './pages/Read';
import Login from './pages/Login';
import Validate from './pages/Validate';
import PrivateRoute from './components/utils/PrivateRoute';
import './App.css';

function App() {
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
