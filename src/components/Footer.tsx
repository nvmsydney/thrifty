import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
      <footer className="footer mt-auto py-3 bg-white">
        <Container>
          <Row>
            <Col xs={12} md={4}>
              <h5 className="pt-3">SHOP</h5>
              <ul className="list-unstyled">
                <li>Designers</li>
                <li>Men</li>
                <li>Women</li>
                <li>Sneakers</li>
              </ul>
            </Col>
            <Col xs={12} md={4}>
              <h5 className="pt-3">SELL</h5>
              <ul className="list-unstyled">
                <li>Getting Started</li>
                <li>Packaging</li>
                <li>Shipping</li>
                <li>Banking</li>
              </ul>
            </Col>
            <Col xs={12} md={4}>
              <h5 className="pt-3">POST</h5>
              <ul className="list-unstyled">
                <li>The Basics</li>
                <li>Guidelines</li>
              </ul>
            </Col>
          </Row>
          <Row>
            <Col className="text-center pt-5">
              <p>Copyright © 2024 Sydney Nguyen & Jermane Jackson</p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  };
  
export default Footer