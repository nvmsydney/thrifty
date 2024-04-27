import React from "react";
import ReactDOM from "react-dom/client";

import "bootstrap/dist/css/bootstrap.css";
import "./components/css/navbar.css";
import "./components/css/stylepreview.css";
import "./components/css/designericons.css";
import "./components/css/homemenswear.css";
import "./components/css/shopsellpost.css";
import "./components/css/editaccount.css";
import "./components/css/productdetails.css";
import "./components/css/community.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginBox from "./components/LoginBox.tsx";
import HomePage from "./pages/HomePage.tsx";
import SignUp from "./components/SignUp.tsx";
import EditAccount from "./components/EditAccount.tsx";
import Community from "./components/Community.tsx";
import ProductDetail from "./components/ProductDetail.tsx";

const router=createBrowserRouter([{
  path:'/~24SP_Jacksonja13',
  element:<LoginBox/>
},{
  path:'/~24SP_Jacksonja13/home',
  element:<HomePage/>
},{
  path:'/~24SP_Jacksonja13/Signup',
  element:<SignUp/>
},{
  path: '/~24SP_Jacksonja13/account',
  element:<EditAccount/>
},{
  path:'/~24SP_Jacksonja13/community',
  element:<Community/>
},{
  path:'/~24SP_Jacskonja13/men/:productSlug',
  element:<ProductDetail />
  }
]);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
