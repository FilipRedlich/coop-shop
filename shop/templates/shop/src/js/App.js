import React, { useEffect } from "react";
import { render } from "react-dom";

//imported components
import MainNav from "./Components/MainNav";
import ProductsNav from "./Components/ProductsNav";
import MainContent from "./Components/MainContent";
import MainFooter from "./Components/Footer";
import renderTry, { TEST_ARRAY } from "./Components/Test";
import { RenderOnLoad } from "./Components/RenderScripts";
import Tttt from "./Components/TestComponent";

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
      <Tttt />
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
