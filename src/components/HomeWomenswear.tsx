import { Container, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface Product {
  id: string;
  title: string;
  image: string;
  category: string;
}

const HomeWomenswear = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const postData = {
          action: "GetWomensClothing",
        };

        const response = await fetch("https://www.cmsc508.com/~24SP_jacksonja13/API.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data && data.success) {
          const validProducts: Product[] = data.products
            .filter(
              (product: any) =>
                product.category && product.category !== "Unknown"
            )
            .map((product: any) => ({
              id: product.clothes_id,
              title: product.selling_title,
              image: product.photo_link,
              category: product.category,
            }));
          setProducts(validProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container className="my-3">
      <Row>
        <h3 className="text-start pt-4">Shop Womenswear</h3>
      </Row>
      <div className="scrollable-row">
        {products.map((product) => (
          <Col key={product.id} className="image-container">
            <Link to={`/women/${product.id}`}>
              <Image src={product.image} className="image-icon" />
              <p className="item-text">{product.title}</p>
            </Link>
          </Col>
        ))}
      </div>
    </Container>
  );
};

export default HomeWomenswear;
