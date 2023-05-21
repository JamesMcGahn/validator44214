import React, { useEffect } from 'react';
import EdiForm from '../components/forms/EdiForm';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { validate, reset } from '../features/edi/ediSlice';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap/';
import AceEditor from 'react-ace';
import Spinner from '../components/ui/Spinner';
import { toast } from 'react-toastify';
import './read.css';

import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

function Read() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ediPayload, isLoading, isSuccess, validatePayload } = useSelector(
    (state) => state.edi,
  );

  useEffect(() => {
    if (isSuccess && validatePayload) {
      dispatch(reset());
      navigate('/validate');
    }
  }, [ediPayload, navigate, isSuccess, validatePayload]);

  const handleOnClick = () => {
    if (ediPayload && !validatePayload) {
      dispatch(validate(ediPayload));
      toast.success('File Validated - Review Report');
      navigate('/validate');
    } else {
      navigate('/validate');
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      {!ediPayload && (
        <Card>
          <Card.Body>
            <Card.Title>There is not a file uploaded yet.</Card.Title>
            <p>Please go back to the upload page and upload a x12 file.</p>
          </Card.Body>
        </Card>
      )}

      {ediPayload && ediPayload?.Result.Status === 'success' && (
        <>
          <Container className="d-flex justify-content-end" fluid>
            <Button onClick={handleOnClick}> Validate File </Button>
          </Container>
          <EdiForm ediPayload={ediPayload} />

          <Container className="d-flex justify-content-end" fluid>
            <Button onClick={handleOnClick}> Validate File </Button>
          </Container>
        </>
      )}

      {ediPayload && ediPayload?.Result.Status === 'error' && (
        <Alert variant="danger">
          <Alert.Heading>There was an error reading the file.</Alert.Heading>
          {ediPayload?.Result.Details.map((error, i) => {
            return (
              <React.Fragment key={`${i}-error`}>
                <p>Message: {error.Message}</p>
                <hr />
                <p className="mb-0">Value: {error.Value}</p>
              </React.Fragment>
            );
          })}
        </Alert>
      )}
      {ediPayload && (
        <Card id="edi-payload-editor">
          <Container>
            <AceEditor
              mode="javascript"
              theme="monokai"
              name="Editor-Edi"
              editorProps={{ $blockScrolling: true }}
              value={JSON.stringify(ediPayload, null, '\t')}
              width="80vw"
              showGutter={true}
              highlightActiveLine={true}
            />
          </Container>
        </Card>
      )}
    </Container>
  );
}
export default Read;
