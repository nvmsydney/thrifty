import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginBox from "./components/LoginBox";
import HomePage from "./pages/HomePage";

function App() {
  return ( 
    <BrowserRouter>
    <Routes>
    <>
    <Route path="/~24SP_Jacksonja13" element={<LoginBox />} />
    <Route path="/~24SP_Jacksonja13/home" element={<HomePage/>} />
  </>
  </Routes>
  </BrowserRouter>
  );
}

export default App;
