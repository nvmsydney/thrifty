import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image, Spinner  } from "react-bootstrap";
import blazer1 from "../assets/blazer1.avif";
import { useParams } from "react-router-dom";
import userAvatar from "../assets/husky.webp"; 
import DirectMessage from "../components/DirectMessaging";
import { IoChatbubblesOutline } from "react-icons/io5";

interface Product {
  clothes_id: string;
  gender: string;
  original_body_text: string | null;
  photo_link: string;
  username: string;
  is_accessory: string;
  title: string | null;
  selling_text: string | null;
  price: string | null;
  category: string | null;
  size: string | null; 
}

const defaultProduct: Product = {
  clothes_id: "",
  gender: "",
  original_body_text: null,
  photo_link: blazer1,
  username: "",
  is_accessory: "",
  title: "Untitled Product",
  selling_text: "No description available",
  price: "0",
  category: "Uncategorized",
  size: "S",
};

function ProductDetail() {
  const [product, setProduct] = useState<Product>(defaultProduct);
  const [mainImage, setMainImage] = useState(blazer1);
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const { productSlug } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true); // Start loading
      try {
        const response = await fetch("https://www.cmsc508.com/~24SP_jacksonja13/API.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "GetClothingDetails",
            clothes_id: productSlug,
          }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && data.products.length > 0) {
          setProduct(data.products[0]);
          setMainImage(data.products[0].photo_link);
        } else {
          console.log("No products found or success flag not set.");
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
      setIsLoading(false); // Stop loading
    };
    fetchProduct();
  }, [productSlug]);

  const toggleChat = () => setShowChat(!showChat);

  const getSize = (product: Product) => {
    return product.size || "Not specified";
  };

  if (isLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="my-4">
        <Col xs={12} md={6}>
          <Image src={mainImage} className="mainImage" fluid />

          <div className="d-flex align-items-center mt-3">
            <Image src={userAvatar} thumbnail className="avatar" />
            <span className="h4 pt-4">{"nvmSydney"}</span>
            <IoChatbubblesOutline
              onClick={toggleChat}
              className="mt-4"
              style={{ marginLeft: "10px", cursor: "pointer" }}
              size="40px"
            />
          </div>
        </Col>
        <Col xs={12} md={6}>
          <h2>{product.title || "Untitled Product"}</h2>
          <h3 className="pt-3">${product.price || 0}</h3>
          <Button variant="outline-dark" className="m-1">
            Add to cart
          </Button>
          <Button variant="btn btn-dark" className="m-1">
            Buy now
          </Button>
          <hr />
          <h4>Details</h4>
          <p>Condition: Like New</p>
          <p>Brand: Thrifty</p>
          <p>Category: {product.category || "Uncategorized"}</p>
          <p>Size: {getSize(product)}</p>
          <h4 className="mt-4">Description</h4>
          <p>{product.selling_text || "No description available"}</p>
        </Col>
      </Row>
      {showChat && <DirectMessage />}
    </Container>
  );
}

export default ProductDetail;
