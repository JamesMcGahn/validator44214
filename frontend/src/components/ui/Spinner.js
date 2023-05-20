import { Container } from 'react-bootstrap';
import PropagateLoader from 'react-spinners/PropagateLoader';

function Spinner() {
  const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: '#007aff',
  };
  return (
    <Container>
      <PropagateLoader
        color="#007aff"
        loading
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Container>
  );
}
export default Spinner;
