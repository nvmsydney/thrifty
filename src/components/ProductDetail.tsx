import { useState } from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import blazer1 from "../assets/blazer1.avif";
import blazer2 from "../assets/blazer2.avif";
import blazer3 from "../assets/blazer3.avif";
import blazer4 from "../assets/blazer4.avif";
import blazer5 from "../assets/blazer5.avif";

function ProductDetail() {
  const [mainImage, setMainImage] = useState(blazer1);
  const product = {
    name: 'The Clinton Blazer',
    price: 125.0,
    details: {
      condition: 'Like new',
      brand: 'Theory',
      category: 'Men / Outerwear',
      size: 'XL',
      posted: '04/15/24',
    },
    description:
      'The ideal warm-weather blazer, our Clinton blazer is easy to wear in a semi-constructed, two-button silhouette with a darted waist for a refined fit. Accented with notch lapels and flap pockets, this iteration is crafted in our breathable and lightweight Good Linen with stretch for all-day comfort.',
    images: [blazer1, blazer2, blazer3, blazer4, blazer5],
  };

  return (
    <Container>
      <Row className="my-4">
        <Col xs={12} md={6}>
          <Image src={mainImage} alt={product.name} fluid />
          <div className="scrollable-row thumbnails d-flex">
            {product.images.map((src, index) => (
              <Image
                key={index}
                src={src}
                alt={`${product.name} ${index + 1}`}
                thumbnail
                onClick={() => setMainImage(src)}
                className="mx-1"
                style={{ width: "100px", height: "auto", cursor: "pointer" }}
              />
            ))}
          </div>
        </Col>
        <Col xs={12} md={6}>
          <h2>{product.name}</h2>
          <h3>${product.price.toFixed(2)}</h3>
          <Button variant="outline-primary" className="m-1">Add to cart</Button>
          <Button variant="primary" className="m-1">Buy now</Button>
          <hr />
          <h4>Details</h4>
          <p>Condition: {product.details.condition}</p>
          <p>Brand: {product.details.brand}</p>
          <p>Category: {product.details.category}</p>
          <p>Size: {product.details.size}</p>
          <p>Posted: {product.details.posted}</p>
          <h4 className="mt-4">Description</h4>
          <p>{product.description}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;
