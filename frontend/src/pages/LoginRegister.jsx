import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Container } from 'react-bootstrap/';
import { useSelector, useDispatch } from 'react-redux';
import { register, login, reset } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import LogRegForm from '../components/forms/LogRegForm';
import './loginRegister.css';

function LoginRegister({ registerForm }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    passwordConfirm: false,
  });
  const { password, email, passwordConfirm } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (isSuccess && user?.token) {
      dispatch(reset());
      navigate('/');
    }
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
    return <Spinner />;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    if (
      errors.email ||
      errors.password ||
      (registerForm && errors.passwordConfirm)
    ) {
      toast.error(`Enter a ${errors.email ? 'valid email' : 'password'}`);
    }

    if (registerForm && password !== passwordConfirm) {
      toast.error('Passwords do not match');
      return;
    }

    if (!errors.email && !errors.password && !errors.passwordConfirm) {
      if (registerForm) {
        const userData = { email, password, passwordConfirm };
        dispatch(register(userData));
      } else {
        const userData = { email, password };
        dispatch(login(userData));
      }
    }
  };

  return (
    <Container className="logregister-page-main">
      <h1 id="logregister-h1">{registerForm ? 'Register' : 'Login'}</h1>
      <LogRegForm
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        validated={validated}
        formData={formData}
        registerForm={registerForm ? true : false}
      />
    </Container>
  );
}
export default LoginRegister;
