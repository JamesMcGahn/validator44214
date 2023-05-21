import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import './uploadFile.css';

function UploadFile({ cb }) {
  const [selectedFile, setSelectedFile] = useState();

  const onFileSelection = (e) => {
    const fileName = e.target.files[0]?.name;

    if (fileName && fileName.match(/\.(.+)$/)[1] !== 'x12') {
      setSelectedFile('');
      toast.error('Please Select a .x12 File');
    } else {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (selectedFile) {
      cb(selectedFile);
    } else {
      toast.error('Please Select a .x12 File');
    }
  };

  return (
    <Container id="upload-x12-main">
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Upload a .x12 File to get started.</Form.Label>
          <Form.Control type="file" onChange={onFileSelection} />
        </Form.Group>

        <Container className="d-flex justify-content-end" fluid>
          <Button type="submit">Upload</Button>
        </Container>
      </Form>
    </Container>
  );
}
export default UploadFile;
