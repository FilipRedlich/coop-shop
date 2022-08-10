import React, { useEffect } from "react";
import { render } from "react-dom";

//imported components
import MainNav from "./Components/Nav/MainNav";
import ProductsNav from "./Components/Nav/ProductsNav";
import MainContent from "./Components/Home/MainContent";
import MainFooter from "./Components/footer/Footer";
import { RenderOnLoad } from "./Components/utility/RenderScripts";
import { AfterLoad } from "./Components/utility/Test";
const NavApp = () => {
  return (
    <>
      <MainNav />
      <ProductsNav />
    </>
  );
};

const MainApp = () => {
  AfterLoad(<MainContent />, document.querySelector("#root"), 300);
  return (
    <>
      <RenderOnLoad />
    </>
  );
};

const FooterApp = () => {
  AfterLoad(<MainFooter />, document.querySelector("#footerRoot"), 600);
  return <></>;
};
render(<NavApp />, document.querySelector("#navRoot"));
render(<MainApp />, document.querySelector("#root"));
render(<FooterApp />, document.querySelector("#footerRoot"));
export default MainApp;
