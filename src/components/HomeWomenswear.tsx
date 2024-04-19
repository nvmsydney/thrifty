import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import women1 from "../assets/women1.avif";
import women2 from "../assets/women2.avif";
import women3 from "../assets/women3.avif";
import women4 from "../assets/women4.avif";
import women5 from "../assets/women5.avif";
import women6 from "../assets/women6.avif";

const HomeWomenswear = () => {
  return (
    <Container className="my-3">
      <Row>
        <h3 className="text-start pt-4">Shop Womenswear</h3>
      </Row>
      <div className="scrollable-row">
        <Col className="image-container">
          <Image src={women1} className="image-icon" />
          <p className="item-text">Cropped Wide-Leg Pant in Good Linen</p>
        </Col>
        <Col className="image-container">
          <Image src={women2} className="image-icon" />
          <p className="item-text">Rolled Sleeve Blazer in Good Linen</p>
        </Col>
        <Col className="image-container">
          <Image src={women3} className="image-icon" />
          <p className="item-text">V-Neck Volume Dress in Good Linen</p>
        </Col>
        <Col className="image-container">
          <Image src={women4} className="image-icon" />
          <p className="item-text">Sleeveless Polo in Basket Weave Linen</p>
        </Col>
        <Col className="image-container">
          <Image src={women5} className="image-icon" />
          <p className="item-text">Shirt in Basket Weave</p>
        </Col>
        <Col className="image-container">
          <Image src={women6} className="image-icon" />
          <p className="item-text">Silky Spring Dress</p>
        </Col>
      </div>
    </Container>
  );
};

export default HomeWomenswear;
