import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import look1 from "../assets/look1.webp";
import look2 from "../assets/look2.webp";
import look3 from "../assets/look3.webp";

function ShapeExample() {
  return (
    <Container fluid>
      <Row>
        <Col xs={4} className="no-padding">
          <Image src={look1} className="full-width-image" />
        </Col>
        <Col xs={4} className="no-padding">
          <div className="position-relative text-white">
            <Image src={look2} className="full-width-image" />
            <div className="overlay-text">
              <h2 className="text-title">Living in Linen</h2>
              <p className="text-description">
                Light as air, bright as spring: find your next go-anywhere style
                for the new season.
              </p>
              <LinkContainer to="/~24SP_jacksonja13/women">
                <Button
                  variant="outline-light"
                  className="square-button button-spacing"
                >
                  SHOP WOMEN
                </Button>
              </LinkContainer>
              <LinkContainer to="/~24SP_jacksonja13/men">
                <Button
                  variant="outline-light"
                  className="square-button button-spacing"
                >
                  SHOP MEN
                </Button>
              </LinkContainer>
            </div>
          </div>
        </Col>
        <Col xs={4} className="no-padding">
          <Image src={look3} className="full-width-image" />
        </Col>
      </Row>
    </Container>
  );
}

export default ShapeExample;
