import React, { useEffect } from "react";
import { render } from "react-dom";

//imported components
import MainNav from "./Components/MainNav";
import ProductsNav from "./Components/ProductsNav";
import MainContent from "./Components/MainContent";
import MainFooter from "./Components/Footer";
import renderTry, { TEST_ARRAY } from "./Components/Test";
import { RenderOnLoad } from "./Components/RenderScripts";

const NavApp = () => {
  return (
    <>
      <MainNav />
      <ProductsNav />
    </>
  );
};

const MainApp = () => {
  return (
    <>
      <RenderOnLoad />
      <MainContent />
    </>
  );
};

const FooterApp = () => {
  return (
    <>
      <MainFooter />
    </>
  );
};
render(<NavApp />, document.querySelector("#navRoot"));
render(<MainApp />, document.querySelector("#root"));
render(<FooterApp />, document.querySelector("#footerRoot"));
export default MainApp;
