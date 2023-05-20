import React, { useEffect } from 'react';
import EdiForm from '../components/forms/EdiForm';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Read() {
  const navigate = useNavigate();
  const { ediPayload } = useSelector((state) => state.edi);

  useEffect(() => {
    if (ediPayload.length === 0) {
      return navigate('/');
    }
  }, [ediPayload, navigate]);

  const payloadData = ediPayload[0];
  return (
    <div>
      {ediPayload.length > 0 ? (
        payloadData.Result.Status === 'success' ? (
          <EdiForm ediPayload={payloadData} />
        ) : (
          <Alert variant="danger">
            <Alert.Heading>There was an error reading the file.</Alert.Heading>
            {payloadData.Result.Details.map((error, i) => {
              return (
                <React.Fragment key={`${i}-error`}>
                  <p>Message: {error.Message}</p>
                  <hr />
                  <p className="mb-0">Value: {error.Value}</p>
                </React.Fragment>
              );
            })}
          </Alert>
        )
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default Read;
