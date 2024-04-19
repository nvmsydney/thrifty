import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import men1 from "../assets/men1.jpg";
import men2 from "../assets/men2.jpg";
import men3 from "../assets/men3.jpg";
import men4 from "../assets/men4.jpg";
import men5 from "../assets/men5.jpg";

const HomeMenswear = () => {
  return (
    <Container className="my-3">
      <Row>
        <h3 className="text-start pt-4">Shop Menswear</h3>
      </Row>
      <div className="scrollable-row">
        <Col className="image-container">
          <Image src={men1} className="image-icon" />
          <p className="item-text">The Clinton Blazer</p>
        </Col>
        <Col className="image-container">
          <Image src={men2} className="image-icon" />
          <p className="item-text">Bron Long Jacket</p>
        </Col>
        <Col className="image-container">
          <Image src={men3} className="image-icon" />
          <p className="item-text">Curtis Full Suit</p>
        </Col>
        <Col className="image-container">
          <Image src={men4} className="image-icon" />
          <p className="item-text">Curtis Drawstring Pant in Good Linen</p>
        </Col>
        <Col className="image-container">
          <Image src={men5} className="image-icon" />
          <p className="item-text">The Irving Shirt</p>
        </Col>
      </div>
    </Container>
  );
};

export default HomeMenswear;
