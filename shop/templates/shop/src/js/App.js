import React from "react";
import { render } from "react-dom"

//imported components
import MainNav from "./Components/MainNav";
import ProductsNav from './Components/ProductsNav';
import MainContent from "./Components/MainContent";


const App = () => {
  return (
    <div>
      <MainNav />
      <ProductsNav />
      <MainContent/>
      

    </div>
  );
};

render(<App />, document.querySelector("#root"));
