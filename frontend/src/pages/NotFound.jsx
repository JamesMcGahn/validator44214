import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './notFound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="notfound-page-main">
      <Card>
        <Card.Body>
          <Card.Title>Ohh nooo.. We can't find that page</Card.Title>
          <p>
            Looks like there was a mistake. We can't find the page that you were
            looking for.
          </p>

          <Container className="d-flex justify-content-end" fluid>
            <Button onClick={() => navigate('/')}> Home </Button>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
}
export default NotFound;
