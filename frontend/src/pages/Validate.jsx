import React from 'react';
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import Spinner from '../components/ui/Spinner';
import { Container } from 'react-bootstrap/';

function Validate() {
  const { isLoading, validatePayload } = useSelector((state) => state.edi);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      {validatePayload && validatePayload?.Status === 'success' && (
        <Alert variant="success">
          <Alert.Heading>The file was successfully validated.</Alert.Heading>
          <p>
            The file was successfully validated. It meets with the
            specifcations.
          </p>
        </Alert>
      )}
      {validatePayload && validatePayload?.Status === 'error' && (
        <>
          {validatePayload.Details.map((error, i) => {
            return (
              <Alert variant="danger" key={`${i}-error`}>
                <Alert.Heading>
                  There was an error reading the file.
                </Alert.Heading>

                <p>Message: {error.Message}</p>
                <hr />
                <p className="mb-0">
                  {error.Value
                    ? `Value: ${error.Value}`
                    : error.SegmentId
                    ? `Segment ID: ${error.SegmentId}`
                    : ''}
                </p>
              </Alert>
            );
          })}
        </>
      )}
    </Container>
  );
}
export default Validate;
