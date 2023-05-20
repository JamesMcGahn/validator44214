import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';

function UploadFile({ cb }) {
  const [selectedFile, setSelectedFile] = useState();

  const onFileSelection = (e) => {
    const fileName = e.target.files[0]?.name;

    if (fileName && fileName.match(/\.(.+)$/)[1] !== 'x12') {
      toast.error('Please Select a .x12 File');
    } else {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (selectedFile) {
      cb(selectedFile);
    }
  };

  return (
    <Container>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Default file input example</Form.Label>
          <Form.Control type="file" onChange={onFileSelection} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
export default UploadFile;
