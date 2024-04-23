import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import StylePreview from "./components/StylePreview";
import Footer from "./components/Footer";
import PopularDesigners from "./components/PopularDesigners";
import HomeMenswear from "./components/HomeMenswear";
import HomeWomenswear from "./components/HomeWomenswear";
import ShopSellPost from "./components/ShopSellPost";
import EditAccount from "./components/EditAccount";
import ProductDetail from "./components/ProductDetail";
import Community from "./components/Community";
import LoginBox from "./components/LoginBox";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        {isLoggedIn && <NavBar />}
        <Routes>
          <Route path="/~24SP_jacksonja13" element={<LoginBox />} />
          <Route
            path="/"
            element={
              <div className="content">
                <StylePreview />
                <PopularDesigners />
                <HomeMenswear />
                <HomeWomenswear />
                <ShopSellPost />
              </div>
            }
          />
          <Route path="/men/:productSlug" element={<ProductDetail />} />
          <Route path="/community" element={<Community />} />
          <Route path="/account" element={<EditAccount />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
