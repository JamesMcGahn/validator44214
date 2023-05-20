import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { read, reset } from '../features/edi/ediSlice';
import { useNavigate } from 'react-router-dom';

import Container from 'react-bootstrap/esm/Container';
import UploadFile from '../components/forms/UploadFile';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ediPayload, isLoading, isSuccess } = useSelector(
    (state) => state.edi,
  );

  const fileUpload = (file) => {
    console.log(file, 'here');
    dispatch(read(file));
  };

  useEffect(() => {
    console.log(ediPayload);
    if (!isLoading && isSuccess && ediPayload.length > 0) {
      dispatch(reset());
      navigate('/read');
    }

    dispatch(reset());
  }, [dispatch, ediPayload, isSuccess, navigate, isLoading]);

  return (
    <Container>
      {!isLoading ? <UploadFile cb={fileUpload} /> : 'loading'}
    </Container>
  );
}
export default Home;
