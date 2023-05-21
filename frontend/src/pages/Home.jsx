import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { read, reset } from '../features/edi/ediSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/ui/Spinner';
import Container from 'react-bootstrap/esm/Container';
import UploadFile from '../components/forms/UploadFile';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ediPayload, isLoading, isSuccess } = useSelector(
    (state) => state.edi,
  );

  const fileUpload = (file) => {
    dispatch(read(file));
  };

  useEffect(() => {
    if (!isLoading && isSuccess && ediPayload) {
      dispatch(reset());
      navigate('/read');
    }

    dispatch(reset());
  }, [dispatch, ediPayload, isSuccess, navigate, isLoading]);

  return (
    <Container fluid>
      {!isLoading ? <UploadFile cb={fileUpload} /> : <Spinner />}
    </Container>
  );
}
export default Home;
