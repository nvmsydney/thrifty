import { ChangeEvent, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Sell = () => {
  const [sellPicture, setSellPicture] = useState("");
  const [sellDiscription, setSellDiscription] = useState("");
  const [sellTitle, setSellTitle] = useState("");
  const [sellGender, setGender] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [sellSize, setSellSize] = useState("");
  const [sellCategory, setSellCategory] = useState("");

  const usernameCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("username="))
    ?.split("=")[1];

  const handleIamgeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    const reader = new FileReader();
    reader.onload = () => {
      setSellPicture(reader.result! as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    if (name === "category") {
      setSellCategory(value);
    }
    if (name === "title") {
      setSellTitle(value);
    }
    if (name === "gender") {
      setGender(value);
    }
    if (name === "price") {
      setSellPrice(value);
    }
    if (name === "description") {
      setSellDiscription(value);
    }
    if (name === "size") {
      setSellSize(value);
    }
  };

  const handleSumbit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    console.log("Category selected:", sellCategory); // Log the category to the console
    try {
      const response = await fetch(
        "https://www.cmsc508.com/~24SP_jacksonja13/API.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "SellPost",
            username: usernameCookie,
            photo_link: sellPicture,
            body_text: sellDiscription,
            gender: sellGender,
            price: sellPrice,
            title: sellTitle,
            category: sellCategory,
            size: sellSize,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setSellPicture("");
        setSellDiscription("");
        setSellTitle("");
        setGender("");
        setSellPrice("");
        setSellSize("");
        setSellCategory("");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  
  return (
    <Container>
      <Row className="my-4">
        <Col xs={6} md={4}>
          <h2>Photos</h2>
          <Form onSubmit={handleSumbit}>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Sell Your Item</Form.Label>
              <Form.Control
                className="input"
                type="file"
                multiple
                onChange={handleIamgeChange}
                accept="image/*"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={sellTitle}
                onChange={handleChange}
                className="input w-100"
                placeholder="What clothing item are you selling?"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={sellDiscription}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about it!"
                className="input w-100"
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={sellGender}
                    className="input"
                    onChange={handleChange}
                  >
                    <option>Gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={sellCategory}
                    className="input"
                    onChange={handleChange}
                  >
                    <option>Select a category</option>
                    <option value="Tops">tops</option>
                    <option value="Dress">dress</option>
                    <option value="Bottoms">bottoms</option>
                    <option value="Outerwear">outerwear</option>
                    <option value="Headwear">headwear</option>
                    <option value="Shoes">footwear</option>
                    <option value="Accessories">accessories</option>
                    <option value="Bags">bags</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Size</Form.Label>
                  <Form.Control
                    as="select"
                    name="size"
                    value={sellSize}
                    className="input"
                    onChange={handleChange}
                  >
                    <option>Select a size</option>
                    <option value="XXS">XXS</option>
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={sellPrice}
                className="input"
                placeholder="Cost?"
                onChange={handleChange}
              />
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
