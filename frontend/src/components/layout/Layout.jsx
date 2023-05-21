import { Container, Row, Col } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import './layout.css';

function Layout({ children }) {
  return (
    <>
      <Header />
      <Container className="layout-main-container" fluid>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}
export default Layout;
