import React from "react";
import { render } from "react-dom";

//imported components
import MainNav from "./Components/MainNav";
import ProductsNav from "./Components/ProductsNav";
import MainContent from "./Components/MainContent";
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
render(<NavApp />, document.querySelector("#navRoot"));
render(<MainApp />, document.querySelector("#root"));

export default MainApp;
