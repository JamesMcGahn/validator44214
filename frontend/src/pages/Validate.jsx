import React, { useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from '../components/ui/Spinner';
import { Container, Button, Row, Col } from 'react-bootstrap/';
import { Card } from 'react-bootstrap';
import { validate, reset } from '../features/edi/ediSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './validate.css';

function Validate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isSuccess, validatePayload, ediPayload } = useSelector(
    (state) => state.edi,
  );

  useEffect(() => {
    if (isSuccess && validatePayload) {
      toast.success('File Validated - Review Report');
      dispatch(reset());
    }
  }, [dispatch, isSuccess, validatePayload]);

  const handleOnClick = () => {
    if (ediPayload && !validatePayload) {
      dispatch(validate(ediPayload));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container id="validate-container">
      <Container>
        <Row>
          <Col>
            <h1>Validate File</h1>
          </Col>
          {ediPayload && ediPayload?.Result.Status === 'success' && (
            <Col>
              <Container className="d-flex justify-content-end" fluid>
                {validatePayload || ediPayload?.Result.Status !== 'success' ? (
                  <Button onClick={() => navigate('/read')}> Read File</Button>
                ) : (
                  <Button onClick={handleOnClick}> Validate File </Button>
                )}
              </Container>
            </Col>
          )}
        </Row>
      </Container>
      <Container id="validate-card-container">
        {!validatePayload && (
          <Card className="validate-card">
            <Card.Body>
              <Card.Title>
                {!ediPayload
                  ? 'There is not a file uploaded yet.'
                  : ediPayload?.Result.Status === 'success'
                  ? 'There is not a file validated yet.'
                  : 'Return the Read Page'}
              </Card.Title>
              <p>
                {!ediPayload
                  ? 'Please go back to the upload page and upload a x12 file.'
                  : ediPayload?.Result.Status === 'success'
                  ? 'Please validate a file.'
                  : 'There are issues with reading file that was uploaded. Return the Read page.'}
              </p>
              {ediPayload && ediPayload?.Result.Status === 'success' && (
                <Container className="d-flex justify-content-end" fluid>
                  <Button onClick={handleOnClick}> Validate File </Button>
                </Container>
              )}
              {!ediPayload && (
                <Container className="d-flex justify-content-end" fluid>
                  <Button onClick={() => navigate('/')}> Upload Page </Button>
                </Container>
              )}
            </Card.Body>
          </Card>
        )}

        {validatePayload && validatePayload?.Status === 'success' && (
          <Row>
            <Col>
              <Alert variant="success" className="validate-card">
                <Alert.Heading>
                  The file was successfully validated.
                </Alert.Heading>
                <p>
                  The file was successfully validated. It meets with the
                  specifcations.
                </p>
              </Alert>
            </Col>
          </Row>
        )}
        {validatePayload && validatePayload?.Status === 'error' && (
          <Col>
            <h3>{`There are ${validatePayload.Details.length} errors in the file.`}</h3>
            {validatePayload.Details.map((error, i) => {
              return (
                <Row key={`${i}-error`}>
                  <Alert variant="danger" className="validate-card">
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
                </Row>
              );
            })}
          </Col>
        )}
      </Container>
    </Container>
  );
}
export default Validate;
