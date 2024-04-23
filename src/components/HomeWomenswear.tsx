import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import women1 from "../assets/women1.avif";
import women2 from "../assets/women2.avif";
import women3 from "../assets/women3.avif";
import women4 from "../assets/women4.avif";
import women5 from "../assets/women5.avif";
import women6 from "../assets/women6.avif";

const products = [
  { id: 1, name: 'Wide-Leg Pant in Good Linen', image: women1, slug: 'wide-leg-pant' },
  { id: 2, name: 'Rolled Sleeve Blazer in Good Linen', image: women2, slug: 'blazer-good-linen' },
  { id: 3, name: 'V-Neck Volume Dress in Good Linen', image: women3, slug: 'dress-good-linen' },
  { id: 4, name: 'Sleeveless Polo in Basket Weave Linen', image: women4, slug: 'polo-linen' },
  { id: 5, name: 'Jacket', image: women5, slug: 'irving-shirt' },
  { id: 6, name: 'Silky Dress', image: women6, slug: 'silk-dress' },
];

const HomeWomenswear = () => {
  return (
    <Container className="my-3">
      <Row>
        <h3 className="text-start pt-4">Shop Womenswear</h3>
      </Row>
      <div className="scrollable-row">
        {products.map((product) => (
          <Col key={product.id} className="image-container">
            <Link to={`/women/${product.slug}`}>
              <Image src={product.image} className="image-icon" />
              <p className="item-text">{product.name}</p>
            </Link>
          </Col>
        ))}
      </div>
    </Container>
  );
};

export default HomeWomenswear;
