import { useState } from "react";
import { Container, Row, Col, Image, Button, Form } from "react-bootstrap";
import women1 from "../assets/women1.avif";

interface CartItem {
  id: number;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Linen Pants",
      price: 21.99,
      size: "XL",
      color: "Cream",
      quantity: 1,
      image: women1,
    },
    {
      id: 2,
      name: "Linen Pants Again",
      price: 21.99,
      size: "XL",
      color: "Cream",
      quantity: 1,
      image: women1,
    },
  ]);

  const updateQuantity = (id: number, newQuantity: number) => {
    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
  };
  return (
    <Container>
      <Row className="my-4">
        <Col xs={12} md={8} className="product-details">
          {cartItems.map((item) => (
            <Row key={item.id} className="mb-3">
              <Col xs={4}>
                <Image src={item.image} alt={item.name} fluid />
              </Col>
              <Col xs={8}>
                <h5>{item.name}</h5>
                <p>Price: ${item.price.toFixed(2)}</p>
                <p>Size: {item.size}</p>
                <p>Color: {item.color}</p>
                <Form.Control
                  as="select"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value))
                  }
                >
                  {[...Array(10).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Form.Control>
                <span
                  style={{
                    cursor: "pointer",
                    textDecoration: "underline",
                    color: "black",
                    marginTop: "10px",
                  }}
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </span>
              </Col>
            </Row>
          ))}
        </Col>
        <Col xs={12} md={4} className="checkout-details">
          <h4>Order Summary</h4>
          <p className="pt-2">
            Total Items:{" "}
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </p>
          <p>
            Estimated Price: $
            {cartItems
              .reduce((acc, item) => acc + item.price * item.quantity, 0)
              .toFixed(2)}
          </p>
          <Button variant="dark" className="w-100">
            Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ShoppingCart;
