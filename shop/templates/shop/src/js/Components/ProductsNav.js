import React from "react";
import { useState } from "react";
import { render } from "react-dom";

//components
import OnSale from "./OnSale";
import Services from "./Services";
import Outlet from "./Outlet";
import Newsletter from "./Newsletter";
import renderTry from "./Test";
import { TEST_CAT, TEST_ARRAY, TEST_ARRAY2 } from "./Test";

const removeSubCat = () => {
  const holder = document.querySelector("#rootSubcategories");
  var doesExist = document.querySelectorAll(".testing");

  if (holder.contains(doesExist[0])) {
    for (let i = 0; i < doesExist.length; i++) {
      doesExist[i].remove();
    }
  }
};

const addEvent = (elements = [], ARRAY = [], ADDITIONAL_ARRAY = []) => {
  for (let i = 0; i < elements.length; i++) {
    console.log(elements[i]);
    elements[i].addEventListener("click", () => {
      switch (elements[i].textContent) {
        case `${ARRAY_3_SUBCATEGORY[0]}`:
          alert("it works hah");
          break;
        case `${ARRAY_3_SUBCATEGORY[1]}`:
          alert("testt");
          break;
        case `${ARRAY_3_SUBCATEGORY[2]}`:
          alert();
          break;
        case `${ARRAY_3_SUBCATEGORY[3]}`:
          alert("4th el");
          break;
      }
      switch (elements[i].textContent) {
        case `${ARRAY_4_SUBCATEGORY[0]}`:
          alert("hehe");
          break;
        case `${ARRAY_4_SUBCATEGORY[1]}`:
          alert("er");
      }
    });
  }
};

const ProductNav = () => {
  const [isActive, setActive] = useState("false");

  const ToggleClass = () => {
    setActive(!isActive);
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
      for (let i = 0; i < arrayOfCategories.length; i++) {
        clone.textContent = arrayOfCategories[i];
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
          case `${ARRAY[0]}`:
            //renderTry(ARRAY_3_SUBCATEGORY);
            renderTry(ARRAY_3_SUBCATEGORY);
            addEvent(document.querySelectorAll(".testing"));
            break;
          case `${ARRAY[1]}`:
            renderTry(ARRAY_4_SUBCATEGORY);
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
      <nav className="product-nav bg-transparent-custom z-index-3 transform-z-3 position-sticky top-0 w-100 d-flex flex-wrap justify-content-center m-auto p-3 gap-3 nav-products">
        <button
          className="btn btn-lg bg-transparent  text-white"
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
          className="btn btn-lg bg-transparent  text-white"
          onClick={() => {
            renderRoot(<OnSale />);
          }}
        >
          On sale
        </button>
        <button
          className="btn btn-lg bg-transparent  text-white"
          onClick={() => {
            renderRoot(<Outlet />);
          }}
        >
          Outlet
        </button>
        <button
          className="btn btn-lg bg-transparent  text-white"
          onClick={() => {
            renderRoot(<Services />);
          }}
        >
          Services
        </button>
        <button
          className="btn btn-lg bg-transparent  text-white"
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
            : " categories-section animate rounded categories-top text-white z-index-1 translate-middle-x start-50 bg-transparent-custom blur-bg "
        }`}
      >
        <div className="row categories-wrapper gap-3 p-2 w-100 mt-5">
          <div
            id="categories"
            className="text-left categories col-3 no-gutters gap-1"
            //Inside this element buttons are rendered
          ></div>

          <div
            id="rootSubcategories"
            className="bg-dark col-md categories-products mx-auto d-flex"
          ></div>
        </div>
      </section>
    </>
  );
};
export { removeSubCat, addEvent };
export default ProductNav;
