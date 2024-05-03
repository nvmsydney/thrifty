import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import men1 from "../assets/men1.jpg";
import men2 from "../assets/men2.jpg";
import men3 from "../assets/men3.jpg";
import men4 from "../assets/men4.jpg";
import men5 from "../assets/men5.jpg";

const products = [
  {
    id: 1,
    name: "Goris Polo Shirt in Light Bilen",
    image: men1,
    slug: "goris-polo-shirt",
    category: "Shirts",
  },
  {
    id: 2,
    name: "Zaine Pant in Organic Cotton",
    image: men2,
    slug: "zaine-pant",
    category: "Bottoms",
  },
  {
    id: 3,
    name: "Cable Knit Polo in Cotton",
    image: men3,
    slug: "cable-knit-polo",
    category: "Shirts",
  },
  {
    id: 4,
    name: "Additional Product 4",
    image: men4,
    slug: "product-4",
    category: "Accessories",
  },
  {
    id: 5,
    name: "Additional Product 5",
    image: men5,
    slug: "product-5",
    category: "Headwear",
  },
];

const MensCatalog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filterProducts = (category) => {
    setActiveCategory(category);
  };

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <Container className="my-3">
      <Row>
        <h3 className="text-start pt-4">Men's Products</h3>
        <ButtonGroup className="mb-3">
          <Button variant="outline-dark" onClick={() => filterProducts("All")}>
            All
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => filterProducts("Tops")}
          >
            Tops
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => filterProducts("Bottoms")}
          >
            Bottoms
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => filterProducts("Outerwear")}
          >
            Outerwear
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => filterProducts("Headwear")}
          >
            Headwear
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => filterProducts("Shoes")}
          >
            Shoes
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => filterProducts("Accessories")}
          >
            Accessories
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => filterProducts("Bags")}
          >
            Bags
          </Button>
        </ButtonGroup>
      </Row>
      <Row>
        {filteredProducts.map((product) => (
          <Col
            key={product.id}
            xs={6}
            sm={4}
            md={3}
            lg={2}
            className="pic-container"
          >
            <Link to={`/men/${product.slug}`}>
              <Image src={product.image} className="pic-icon" />
              <p className="item-text2">{product.name}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MensCatalog;
