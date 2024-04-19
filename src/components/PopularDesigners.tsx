import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import coach from "../assets/coach.jpg";
import chanel from "../assets/chanel.jpg";
import LV from "../assets/LV-logo.jpg";
import prada from "../assets/prada.png";

const DesignerIcons = () => {
  return (
    <Container className="my-3">
      <Row>
        <h3 className="text-start">Popular Designers</h3>
      </Row>
      <Row>
        <div className="scrollable-row">
          <Image
            src={coach}
            alt="Coach"
            className="designer-icon rounded-circle"
          />
          <Image
            src={chanel}
            alt="Chanel"
            className="designer-icon rounded-circle"
          />
          <Image
            src={LV}
            alt="LV"
            className="designer-icon rounded-circle"
          />
          <Image
            src={prada}
            alt="prada"
            className="designer-icon rounded-circle"
          />
          <Image
            src={coach}
            alt="Coach"
            className="designer-icon rounded-circle"
          />
          <Image
            src={chanel}
            alt="Chanel"
            className="designer-icon rounded-circle"
          />
          <Image
            src={LV}
            alt="LV"
            className="designer-icon rounded-circle"
          />
          <Image
            src={prada}
            alt="prada"
            className="designer-icon rounded-circle"
          />
        </div>
      </Row>
    </Container>
  );
};

export default DesignerIcons;
