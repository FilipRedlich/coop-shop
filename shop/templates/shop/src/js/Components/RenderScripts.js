import React from "react";
import renderTry, { imgArr, TEST_ARRAY } from "./Test";
import { removeSubCat } from "./ProductsNav";
import { addEvent } from "./ProductsNav";
import { render } from "react-dom";
import RenderSubcat from "./Test";

const renderInSubRoot = (el, options) => {
  return (
    <div id="subRoot" className={options}>
      {el}
    </div>
  );
};

const RenderOnLoad = () => {
  removeSubCat();
  renderTry(SUBCATS_NAME[1], SUBCATS_IMG[0]);
  addEvent(document.querySelectorAll(".testing"));
  console.log("RenderOnLoad in RenderScripts");
  return <></>;
};

//Adds functionality to category buttons
const RenderFromCat = (ARRAY = []) => {
  const categories = document.querySelectorAll(".categories-button");

  for (let i = 0; i < ARRAY.length; i++) {
    categories[i].addEventListener("click", () => {
      removeSubCat(); //removes all previous rendered subcategories
      //adds function to specified category
      switch (ARRAY[i]) {
        //remove comments for renderTry function when switching from/to prod (ARRAY_x_SUBCATEGORY should be on prod!)
        //After recent changes (25.04.2022) ARRAY_x_SUBCATEGORY is now changed to multidimensional array 'SUBCATS_x'
        //x now defines it's type - name, picture etc.
        case `${ARRAY[0]}`:
          //renderTry(SUBCATS_NAME[1], SUBCATS_IMG[0]);
          render(<RenderSubcat el={SUBCATS_NAME[1]} img={SUBCATS_IMG[0]} />, document.querySelector('#rootSubcategories'))
          
          //renderTry(TEST_ARRAY);
          addEvent(document.querySelectorAll(".testing"));
          break;
        case `${ARRAY[1]}`:
          //renderTry(TEST_ARRAY2);
          renderTry(SUBCATS_NAME[2], SUBCATS_IMG[1]);
          addEvent(document.querySelectorAll(".testing"));
          break;
      }
    });
  }
};

export { RenderOnLoad, RenderFromCat, renderInSubRoot };

