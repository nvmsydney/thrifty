import NavBar from "../components/NavBar";
import ProductDetail from "../components/ProductDetail";
import Footer from "../components/Footer";

function ProductDetailPage() {
  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <ProductDetail />
      <Footer />
    </div>
  );
}

export default ProductDetailPage;
