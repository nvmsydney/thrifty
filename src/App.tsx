import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import StylePreview from "./components/StylePreview";
import Footer from "./components/Footer";
import PopularDesigners from "./components/PopularDesigners";
import HomeMenswear from "./components/HomeMenswear";
import HomeWomenswear from "./components/HomeWomenswear";
import ShopSellPost from "./components/ShopSellPost";
import LoginBox from "./components/LoginBox";


function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <NavBar />
        <Routes>
          <Route path="/~24SP_jacksonja13" element ={<LoginBox />} />
          <Route path="/home" element={
            <div className="content">
              <StylePreview />
              <PopularDesigners />
              <HomeMenswear />
              <HomeWomenswear />
              <ShopSellPost />
            </div>
          }/>

        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;