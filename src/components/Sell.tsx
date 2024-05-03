import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Sell = () => {
  return (
    <Container>
      <Row className="my-4">
        <Col xs={6} md={4}>
          <h2>Photos</h2>
          <Form>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Sell Your Item</Form.Label>
              <Form.Control type="file" multiple />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                className="w-100"
                placeholder="What clothing item are you selling?"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Tell us about it!"
                className="w-100"
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as="select">
                    <option>Gender</option>
                    <option>Women</option>
                    <option>Men</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select">
                    <option>Select a category</option>
                    <option>Tops</option>
                    <option>Dresses</option>
                    <option>Bottoms</option>
                    <option>Outerwear</option>
                    <option>Headwear</option>
                    <option>Shoes</option>
                    <option>Accessories</option>
                    <option>Bags</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Size</Form.Label>
                  <Form.Control as="select">
                    <option>Select a size</option>
                    <option>XXS</option>
                    <option>XS</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control type="text" placeholder="Cost?"  />
            </Form.Group>
            <Button variant="dark" type="submit">
              Upload
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Sell;
