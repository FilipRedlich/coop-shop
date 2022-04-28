import React from "react";
import { useState } from "react";
import { render } from "react-dom";

//components
import OnSale from "./OnSale";
import Services from "./Services";
import Outlet from "./Outlet";
import Newsletter from "./Newsletter";
import renderTry from "./Test";
import { TEST_CAT, TEST_ARRAY, TEST_ARRAY2, imgArr } from "./Test";

const removeSubCat = () => {
  const holder = document.querySelector("#rootSubcategories");
  var doesExist = document.querySelectorAll(".testing");

  if (holder.contains(doesExist[0])) {
    for (let i = 0; i < doesExist.length; i++) {
      doesExist[i].remove();
    }
  }
};

const addEvent = (elements = []) => {
  for (let i = 0; i < elements.length; i++) {
    console.log(elements[i]);
    elements[i].addEventListener("click", () => {
      switch (elements[i].textContent) {
        case `${SUBCATS_NAME[1][0]}`:
          alert("it works hah");
          break;
        case `${SUBCATS_NAME[1][1]}`:
          alert("testt");
          break;
        case `${SUBCATS_NAME[1][2]}`:
          alert();
          break;
        case `${SUBCATS_NAME[1][3]}`:
          alert("4th el");
          break;
        case `${SUBCATS_NAME[1][4]}`:
          alert("4th el");
          break;
        case `${SUBCATS_NAME[1][5]}`:
          alert("4th el");
          break;
        case `${SUBCATS_NAME[1][6]}`:
          alert("4th el");
          break;
        case `${SUBCATS_NAME[1][7]}`:
          alert("4th el");
          break;
        case `${SUBCATS_NAME[1][8]}`:
          alert("4th el");
          break;
      }
      switch (elements[i].textContent) {
        case `${SUBCATS_NAME[2][0]}`:
          alert("hehe");
          break;
        case `${SUBCATS_NAME[2][1]}`:
          alert("er");
          break;
        case `${SUBCATS_NAME[2][2]}`:
          alert("er");
          break;
        case `${SUBCATS_NAME[2][3]}`:
          alert("er");
          break;
      }
    });
  }
};

const ProductNav = () => {
  const [isActive, setActive] = useState("false");

  const ToggleClass = () => {
    const body = document.body;
    setActive(!isActive);
    if(isActive){
      body.style.overflow = 'hidden';
      body.style.overflowX = "hidden";
    }else{
      body.style.overflow = 'auto';
      body.style.overflowX = 'hidden';
    }
  };

  const buttonBuilder = (CAT_ARRAY) => {
    //Creates buttons, adds classes and text to them
    var button = document.createElement("button").cloneNode(true);
    var clone = button.cloneNode(true);
    var holder = document.querySelector(".categories");
    let isExisting = document.querySelector(".cat-btn");

    //Adding details to button
    clone.classList.add(
      "cat-btn",
      "btn",
      "categories-button",
      "mb-2",
      "mx-auto",
      "text-white",
      "bg-dark"
      
    );

    //console.log(button)
    console.log(clone);

    if (holder.contains(isExisting)) {
      console.log("it exists so I wont add more buttons");
      return;
    }
    if (!holder.contains(isExisting)) {
      for (let i = 0; i < TEST_CAT.length; i++) {
        clone.textContent = TEST_CAT[i];
        holder.appendChild(clone.cloneNode(true));
      }
      //for (let i = 0; i < CAT_ARRAY.length; i++) {
      //  clone.textContent = CAT_ARRAY[i];
      //  holder.appendChild(clone.cloneNode(true));
      //}
      return;
    }
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
            renderTry(SUBCATS_NAME[1], imgArr);
            //renderTry(TEST_ARRAY);
            addEvent(document.querySelectorAll(".testing"));
            break;
          case `${ARRAY[1]}`:
            //renderTry(TEST_ARRAY2);
            renderTry(SUBCATS_NAME[2], imgArr);
            addEvent(document.querySelectorAll(".testing"));
            break;
        }
      });
    }
  };
  const renderRoot = (renderElement) => {
    render(renderElement, document.querySelector("#root"));
  };

  return (
    <>
      <nav className="product-nav bg-black z-index-3 transform-z-3 position-sticky top-0 w-100 d-flex flex-wrap justify-content-center m-auto p-3 gap-3 nav-products">
        <button
          className="btn btn-lg bg-transparent prodNav-btn text-white"
          onClick={() => {
            ToggleClass();
            //renderTry(TEST_ARRAY2);
            //addEvent(document.querySelectorAll(".testing"), TEST_CAT);
            buttonBuilder(TEST_CAT);
            RenderFromCat(TEST_ARRAY, removeSubCat);
          }}
        >
          Categories
        </button>
        <button
          className="btn btn-lg bg-transparent prodNav-btn text-white"
          onClick={() => {
            renderRoot(<OnSale />);
          }}
        >
          On sale
        </button>
        <button
          className="btn btn-lg bg-transparent prodNav-btn text-white"
          onClick={() => {
            renderRoot(<Outlet />);
          }}
        >
          Outlet
        </button>
        <button
          className="btn btn-lg bg-transparent prodNav-btn text-white"
          onClick={() => {
            renderRoot(<Services />);
          }}
        >
          Services
        </button>
        <button
          className="btn btn-lg bg-transparent prodNav-btn text-white"
          onClick={() => {
            renderRoot(<Newsletter />);
          }}
        >
          Newsletter
        </button>
      </nav>

      <section
        className={`position-fixed categories-section translate-z-0 w-100  ${
          isActive
            ? "hide-element"
            : " categories-section animate rounded categories-top text-white z-index-1 translate-middle-x bg-transparent-custom blur-bg "
        }`}
      >
        <div className="row categories-wrapper gap-3 p-2 w-100 mt-5 min-h-30">
          <div
            id="categories"
            className="text-left categories col-3 no-gutters gap-1"
            //Inside this element buttons are rendered
          ></div>

          <div
            id="rootSubcategories"
            className="bg-dark col-md categories-products mx-auto d-flex flex-row flex-wrap gap-2 p-2 "
          ></div>
        </div>
      </section>
    </>
  );
};
export { removeSubCat, addEvent };
export default ProductNav;
