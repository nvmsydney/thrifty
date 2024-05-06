import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "./components/css/navbar.css";
import "./components/css/stylepreview.css";
import "./components/css/designericons.css";
import "./components/css/homemenswear.css";
import "./components/css/shopsellpost.css";
import "./components/css/editaccount.css";
import "./components/css/productdetails.css";
import "./components/css/community.css";
import "./components/css/profile.css";
import "./components/css/shoppingcart.css";
import "./components/css/catalog.css";
import "./components/css/backgroundVideo.css";
import "./components/css/directmessage.css";
import "./components/css/search.css";

import LoginBox from "./components/LoginBox";
import HomePage from "./pages/HomePage";
import SignUp from "./components/SignUp";
import EditAccountPage from "./pages/EditAccountPage";
import CommunityPage from "./pages/CommunityPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import AddPost from "./components/AddPost";
import SellPage from "./pages/SellPage";
import ProfilePage from "./pages/ProfilePage";
import ShoppingCartPage from "./pages/ShoppingCartPage";
import MensCatalogPage from "./pages/MensCatalogPage";
import WomensCatalogPage from "./pages/WomensCatalogPage";
import DirectMessage from "./components/DirectMessaging";
import SearchBar from "./components/SearchBar";

const router = createBrowserRouter([
  { path: "/~24SP_Jacksonja13", element: <LoginBox /> },
  { path: "/~24SP_Jacksonja13/home", element: <HomePage /> },
  { path: "/~24SP_Jacksonja13/signup", element: <SignUp /> },
  { path: "/~24SP_Jacksonja13/edit-profile", element: <EditAccountPage /> },
  { path: "/~24SP_Jacksonja13/view-profile", element: <ProfilePage /> },
  { path: "/~24SP_Jacksonja13/sell", element: <SellPage /> },
  { path: "/~24SP_Jacksonja13/community", element: <CommunityPage /> },
  {
    path: "/~24SP_Jacksonja13/men/:productSlug",
    element: <ProductDetailPage />,
  },
  {
    path: "/~24SP_Jacksonja13/women/:productSlug",
    element: <ProductDetailPage />,
  },
  { path: "/~24SP_Jacksonja13/addpost", element: <AddPost /> },
  { path: "/~24SP_Jacksonja13/profile", element: <ProfilePage /> },
  { path: "/~24SP_Jacksonja13/cart", element: <ShoppingCartPage /> },
  { path: "/~24SP_Jacksonja13/men", element: <MensCatalogPage /> },
  { path: "/~24SP_Jacksonja13/women", element: <WomensCatalogPage /> },
  { path: "/~24SP_Jacksonja13/directmessage", element: <DirectMessage /> },
  { path: "/~24SP_Jacksonja13/searchbar", element:<SearchBar/>}
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
} else {
  console.error("Failed to find the root element");
}
