import { useState, useEffect } from 'react';
import { Container, Form, InputGroup, Button } from 'react-bootstrap/';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [validated, setValidated] = useState(false);
  const { password, email } = formData;
  const { token, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      console.log('hhhhh', message);
      //   toast.error(message);
    }

    if (isSuccess && token) {
      navigate('/');
    }
    dispatch(reset());
  }, [isError, isSuccess, token, message, navigate, dispatch]);

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.checkValidity()) {
      console.log('here-check');
      event.stopPropagation();
      setValidated(false);
    }
    setValidated(true);

    if (validated && form.checkValidity()) {
      const userData = { email, password };
      dispatch(login(userData));
    }
  };

  return (
    <Container>
      <Container>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
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
          <Button type="submit">Login</Button>
        </Form>
      </Container>
    </Container>
  );
}
export default Login;
