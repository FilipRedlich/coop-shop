import React, { useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//imported components
import ProductsNav from "./Components/Nav/ProductsNav";
import { MainContent } from "./Components/Home/MainContent";
import MainFooter from "./Components/footer/Footer";
import { RenderProducts2 } from "./Components/Nav/ProductsNav";
import { RenderOnLoad, RenderSubcat } from "./Components/utility/RenderScripts";
import { AfterLoad } from "./Components/utility/Test";
import { subcatNamesTest, subcatImagesTest } from "./Components/utility/Test";
//TEST
import { productsTest } from "./Components/utility/Test";

// const MainApp = () => {
//   AfterLoad(<MainContent />, document.querySelector("#root"), 600);
//   return (
//     <>
//       <RenderOnLoad subcatNames={subcatNamesTest[1]}/> {/* For the first time Renders subcategories, it renders them inside the container that shows on clicking categories button */}
//     </>
//   );
// };
const MemoizedProductsNav = React.memo(ProductsNav);
const MemoizedMainFooter = React.memo(MainFooter);

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Newsletter from "./Components/Newsletter/Newsletter";
import OnSale from "./Components/OnSale/OnSale";
import { ItemBar } from "./Components/Home/Itembar";
import Login from "./Components/Login/Login";
import Cart from "./Components/Cart/Cart";

const App = () => {
  return (
    <>
      <MemoizedProductsNav subcatNames={subcatNamesTest} />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/home|/" element={<MainContent />} />
        <Route path="newsletter" element={<Newsletter />} />
        <Route path="onSale" element={<OnSale />} />
        <Route path="products/:productsID" element={<RenderProducts2 el={productsTest} />} />
        <Route path="login" element={<Login />}/>
        <Route path="cart" element={<Cart />}/>
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
