import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { read, reset, resetAll } from '../features/edi/ediSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../components/ui/Spinner';
import Container from 'react-bootstrap/esm/Container';
import UploadFile from '../components/forms/UploadFile';
import './home.css';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ediPayload, isLoading, isSuccess } = useSelector(
    (state) => state.edi,
  );

  const fileUpload = (file) => {
    dispatch(resetAll());
    dispatch(read(file));
  };

  useEffect(() => {
    if (isSuccess && ediPayload) {
      toast.success('File Read Succesfully');
      dispatch(reset());
      navigate('/read');
    }

    dispatch(reset());
  }, [dispatch, ediPayload, isSuccess, navigate]);

  if (isLoading) {
    return <Spinner />;
  }

  console.log(isLoading, 'loading - comp');
  return (
    <Container fluid id="home-main-container">
      <UploadFile cb={fileUpload} />
    </Container>
  );
}
export default Home;
