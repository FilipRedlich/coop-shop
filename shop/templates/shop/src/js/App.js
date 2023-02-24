import React, { useEffect } from "react";
import { render } from "react-dom";

//imported components
import ProductsNav from "./Components/Nav/ProductsNav";
import {MainContent} from "./Components/Home/MainContent";
import MainFooter from "./Components/footer/Footer";
import { RenderOnLoad } from "./Components/utility/RenderScripts";
import { AfterLoad } from "./Components/utility/Test";


const MainApp = () => {
  AfterLoad(<MainContent />, document.querySelector("#root"), 600);
  return (
    <>
      <RenderOnLoad /> {/* For the first time Renders subcategories, it renders them inside the container that shows on clicking categories button */}
    </>
  );
};

render(<ProductsNav />, document.querySelector("#navRoot"));
render(<MainApp />, document.querySelector("#root"));
render(<MainFooter />, document.querySelector("#footerRoot"));

export default MainApp;
