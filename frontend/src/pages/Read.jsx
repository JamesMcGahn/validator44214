import React, { useEffect } from 'react';
import EdiForm from '../components/forms/EdiForm';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { validate, reset } from '../features/edi/ediSlice';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Button } from 'react-bootstrap/';
import AceEditor from 'react-ace';
import Spinner from '../components/ui/Spinner';

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
    if (!ediPayload) {
      navigate('/');
    }

    if (isLoading) {
      return <Spinner />;
    }

    if (isSuccess && validatePayload) {
      dispatch(reset());
      navigate('/validate');
    }
  }, [ediPayload, navigate, isLoading, isSuccess, validatePayload]);

  const handleOnClick = () => {
    if (ediPayload && !validatePayload) {
      dispatch(validate(ediPayload));
      navigate('/validate');
    } else {
      navigate('/validate');
    }
  };

  return (
    <Container>
      {ediPayload && ediPayload?.Result.Status === 'success' && (
        <>
          <EdiForm ediPayload={ediPayload} />
          <Button onClick={handleOnClick}> Validate File </Button>
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
      <Card>
        <Container>
          {ediPayload && (
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
          )}
        </Container>
      </Card>
    </Container>
  );
}
export default Read;
