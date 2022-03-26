import React from "react";
import { render } from "react-dom";

//imported components
import MainNav from "./Components/MainNav";
import ProductsNav from "./Components/ProductsNav";
import MainContent from "./Components/MainContent";
import MainFooter from "./Components/Footer";
import OnSale from './Components/OnSale';

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
      <MainContent />
    </>
  );
};

const FooterApp = () => {
  return (
    <>
    <MainFooter />
    </>
  )
}
render(<NavApp />, document.querySelector("#navRoot"));
render(<MainApp />, document.querySelector("#root"));
render(<FooterApp />, document.querySelector('#footerRoot'))
export default MainApp;
