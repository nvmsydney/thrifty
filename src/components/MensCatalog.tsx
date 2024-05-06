import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  image: string;
  category: string;
}

const MensCatalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const postData = {
          action: "GetMensClothing",
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
          const uniqueCategories = Array.from(
            new Set(validProducts.map((p) => p.category))
          );
          setCategories(uniqueCategories);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (category: string) => {
    setActiveCategory(category);
  };

  const filteredProducts = products.filter(
    (product) => activeCategory === "All" || product.category === activeCategory
  );

  return (
    <Container className="my-3">
      <Row>
        <h3 className="text-start pt-4">Men's Products</h3>
        <ButtonGroup className="mb-3">
          <Button variant="outline-dark" onClick={() => filterProducts("All")}>
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant="outline-dark"
              onClick={() => filterProducts(category)}
            >
              {category}
            </Button>
          ))}
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
            <Link to={`/~24SP_jacksonja13/men/${product.id}`}>
              <Image src={product.image} className="pic-icon" />
              <p className="item-text2">{product.title}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MensCatalog;
