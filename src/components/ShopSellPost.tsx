import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaRegCreditCard } from "react-icons/fa";
import { IoCashOutline } from "react-icons/io5";
import { IoCameraOutline } from "react-icons/io5";

const CustomComponent = () => {
  return (
    <div className="custom-gray-component">
      <Row>
        <Col className="text-center">
          <FaRegCreditCard size={80} />
          <h3>SHOP</h3>
          <p>Find your next favorite piece.</p>
        </Col>
        <Col className="text-center">
        <IoCashOutline size={80} />
          <h3>SELL</h3>
          <p>Sell new or pre-loved clothes with no fees.</p>
        </Col>
        <Col className="text-center">
        <IoCameraOutline size={80} />
          <h3>POST</h3>
          <p>Show off your latest find.</p>
        </Col>
      </Row>
    </div>
  );
};

export default CustomComponent;
