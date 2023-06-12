import React, { useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsNav from "./Components/Nav/ProductsNav";
import { MainContent } from "./Components/Home/MainContent";
import MainFooter from "./Components/footer/Footer";
import { RenderProducts2 } from "./Components/Nav/ProductsNav";
import { subcatNamesTest, subcatImagesTest } from "./Components/utility/Test";
import Newsletter from "./Components/Newsletter/Newsletter";
import OnSale from "./Components/OnSale/OnSale";
import Login from "./Components/Login/Login";
import Cart from "./Components/Cart/Cart";

const MemoizedProductsNav = React.memo(ProductsNav);
const MemoizedMainFooter = React.memo(MainFooter);

// PWA support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swUrl = new URL("./service-worker.js", import.meta.url);

    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log("Service worker registered");
      })
      .catch((err) => {
        console.log("Encountered an error:", err);
      });
  });
}


const App = () => {
  return (
    <>
      <MemoizedProductsNav subcatNames={subcatNamesTest} />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/home|/" element={<MainContent />} />
        <Route path="*" element={<MainContent />} />
        <Route path="newsletter" element={<Newsletter />} />
        <Route path="onSale" element={<OnSale />} />
        <Route path="products/:productsID" element={<RenderProducts2 el={products} />} />
        <Route path="login" element={<Login />} />
        <Route path="cart" element={<Cart />} />
      </Routes>

      <MemoizedMainFooter />
    </>
  );
};

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector("#app")
);
