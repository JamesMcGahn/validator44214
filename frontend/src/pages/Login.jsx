import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Container, Form, InputGroup, Button } from 'react-bootstrap/';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const { password, email } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user?.token) {
      toast.success(`Welcome back ${user.email}`);
      navigate('/');
    }
    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    e.currentTarget.checkValidity()
      ? setErrors((prevState) => ({
          ...prevState,
          [e.target.name]: false,
        }))
      : setErrors((prevState) => ({
          ...prevState,
          [e.target.name]: true,
        }));

    setValidated(true);
  };

  if (isLoading) {
    <Spinner />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (errors.email || errors.password) {
      toast.error(`Enter a ${errors.email ? 'valid email' : 'password'}`);
    }
    if (!errors.email && !errors.password) {
      const userData = { email, password };
      dispatch(login(userData));
    }
  };

  return (
    <Container className="login-page-main">
      <h1 id="login-h1">Login</h1>
      <Container id="login-form-container">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="login-email-input">Email</InputGroup.Text>
            <Form.Control
              placeholder="Enter Your Email"
              aria-label="Email"
              type="email"
              onChange={handleOnChange}
              value={email}
              id="email"
              name="email"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid email.
            </Form.Control.Feedback>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Password</InputGroup.Text>
            <Form.Control
              placeholder="Enter Your Password"
              aria-label="Password"
              type="password"
              onChange={handleOnChange}
              value={password}
              id="password"
              name="password"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide your password.
            </Form.Control.Feedback>
          </InputGroup>
          <Container className="d-flex justify-content-end" fluid>
            <Button type="submit">Login</Button>
          </Container>
        </Form>
      </Container>
    </Container>
  );
}
export default Login;
