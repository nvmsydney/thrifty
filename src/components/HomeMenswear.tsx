import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import men1 from "../assets/men1.jpg";
import men2 from "../assets/men2.jpg";
import men3 from "../assets/men3.jpg";
import men4 from "../assets/men4.jpg";
import men5 from "../assets/men5.jpg";

const products = [
  { id: 1, name: 'The Clinton Blazer', image: men1, slug: 'clinton-blazer' },
  { id: 2, name: 'Bron Long Jacket', image: men2, slug: 'bron-long-jacket' },
  { id: 3, name: 'Curtis Full Suit', image: men3, slug: 'curtis-full-suit' },
  { id: 4, name: 'Curtis Drawstring Pant in Good Linen', image: men4, slug: 'curtis-drawstring-pant' },
  { id: 5, name: 'The Irving Shirt', image: men5, slug: 'irving-shirt' },
];

const HomeMenswear = () => {
  return (
    <Container className="my-3">
      <Row>
        <h3 className="text-start pt-4">Shop Menswear</h3>
      </Row>
      <div className="scrollable-row">
        {products.map((product) => (
          <Col key={product.id} className="image-container">
            <Link to={`/~24SP_jacksonja13/men/${product.slug}`}>
              <Image src={product.image} className="image-icon" />
              <p className="item-text">{product.name}</p>
            </Link>
          </Col>
        ))}
      </div>
    </Container>
  );
};

export default HomeMenswear;
