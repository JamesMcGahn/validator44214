import { Container, Form, InputGroup, Button } from 'react-bootstrap/';
import './logResForm.css';

function LogRegForm({
  formData,
  handleOnChange,
  handleSubmit,
  validated,
  registerForm,
}) {
  const { email, password, passwordConfirm } = formData;

  return (
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
        {registerForm && (
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">
              Confirm Password
            </InputGroup.Text>
            <Form.Control
              placeholder="Confirm Your Password"
              aria-label="Password Confirm"
              type="password"
              onChange={handleOnChange}
              value={passwordConfirm}
              id="passwordConfirm"
              name="passwordConfirm"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide your password.
            </Form.Control.Feedback>
          </InputGroup>
        )}
        <Container className="d-flex justify-content-end" fluid>
          <Button type="submit">{registerForm ? 'Register' : 'Login'}</Button>
        </Container>
      </Form>
    </Container>
  );
}
export default LogRegForm;
