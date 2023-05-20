import React, { useEffect } from 'react';
import EdiForm from '../components/forms/EdiForm';
import Alert from 'react-bootstrap/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap/';
import AceEditor from 'react-ace';
import 'ace-builds/webpack-resolver';

import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

function Read() {
  const navigate = useNavigate();
  const { ediPayload } = useSelector((state) => state.edi);

  useEffect(() => {
    if (ediPayload.length === 0) {
      navigate('/');
    }
  }, [ediPayload, navigate]);

  const payloadData = ediPayload[0];

  if (ediPayload.length > 0)
    return (
      <Container>
        {payloadData?.Result.Status === 'success' ? (
          <EdiForm ediPayload={payloadData} />
        ) : (
          <Alert variant="danger">
            <Alert.Heading>There was an error reading the file.</Alert.Heading>
            {payloadData?.Result.Details.map((error, i) => {
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
            <AceEditor
              mode="javascript"
              theme="monokai"
              name="Editor-Edi"
              editorProps={{ $blockScrolling: true }}
              value={JSON.stringify(payloadData, null, '\t')}
              width="80vw"
              showGutter={true}
              highlightActiveLine={true}
            />
          </Container>
        </Card>
      </Container>
    );
}
export default Read;
