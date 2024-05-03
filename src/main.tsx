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

import LoginBox from "./components/LoginBox";
import HomePage from "./pages/HomePage";
import SignUp from "./components/SignUp";
import EditAccount from "./components/EditAccount";
import Community from "./components/Community";
import ProductDetail from "./components/ProductDetail";
import AddPost from "./components/AddPost";

const router = createBrowserRouter([
  { path: "/~24SP_Jacksonja13", element: <LoginBox /> },
  { path: "/~24SP_Jacksonja13/home", element: <HomePage /> },
  { path: "/~24SP_Jacksonja13/signup", element: <SignUp /> },
  { path: "/~24SP_Jacksonja13/account", element: <EditAccount /> },
  { path: "/~24SP_Jacksonja13/community", element: <Community /> },
  { path: "/~24SP_Jacksonja13/men/:productSlug", element: <ProductDetail /> },
  { path: "/~24SP_Jacksonja13/addpost", element: <AddPost /> },
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
