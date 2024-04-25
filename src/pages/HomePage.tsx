import NavBar from "../components/NavBar";
import StylePreview from "../components/StylePreview";
import Footer from "../components/Footer";
import PopularDesigners from "../components/PopularDesigners";
import HomeMenswear from "../components/HomeMenswear";
import HomeWomenswear from "../components/HomeWomenswear";
import ShopSellPost from "../components/ShopSellPost";

function HomePage() {
  return (
    <div className="d-flex flex-column h-100">
      <NavBar />
      <StylePreview />
      <PopularDesigners />
      <HomeMenswear />
      <HomeWomenswear />
      <ShopSellPost />
      <Footer />
    </div>
  );
}

export default HomePage;