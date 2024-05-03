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
import women1 from "../assets/women1.avif";
import women2 from "../assets/women2.avif";
import women3 from "../assets/women3.avif";
import women4 from "../assets/women4.avif";
import women5 from "../assets/women5.avif";
import women6 from "../assets/women6.avif";

interface Product {
  id: number;
  name: string;
  image: string;
  slug: string;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Wide-Leg Pant in Good Linen",
    image: women1,
    slug: "linen-pant",
    category: "Bottoms",
  },
  {
    id: 2,
    name: "Rolled Sleeve Blazer in Good Linen",
    image: women2,
    slug: "blazer",
    category: "Outerwear",
  },
  {
    id: 3,
    name: "V-Neck Volume Dress in Good Linen",
    image: women3,
    slug: "v-dress",
    category: "Dresses",
  },
  {
    id: 4,
    name: "Sleeveless Polo in Basket Weave Linen",
    image: women4,
    slug: "polo-linen",
    category: "Shirts",
  },
  {
    id: 5,
    name: "Jacket",
    image: women5,
    slug: "irving-shirt",
    category: "Outerwear",
  },
  {
    id: 6,
    name: "Silky Dress",
    image: women6,
    slug: "silk-dress",
    category: "Dresses",
  },
];

const WomensCatalog = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filterProducts = (category: string) => {
    setActiveCategory(category);
  };

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);

  return (
    <Container className="my-3">
      <Row>
        <h3 className="text-start pt-4">Women's Products</h3>
        <ButtonGroup className="mb-3">
          <Button variant="outline-dark" onClick={() => filterProducts("All")}>
            All
          </Button>
          <Button variant="outline-dark" onClick={() => filterProducts("Tops")}>
            Tops
          </Button>
          <Button
            variant="outline-dark"
            onClick={() => filterProducts("Dresses")}
          >
            Dresses
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
          <Button variant="outline-dark" onClick={() => filterProducts("Bags")}>
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
            <Link to={`/women/${product.slug}`}>
              <Image src={product.image} className="pic-icon" />
              <p className="item-text2">{product.name}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WomensCatalog;
