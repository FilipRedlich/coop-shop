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
import { RenderFromCat, renderInSubRoot } from "./RenderScripts";
import buttonBuilder from "./ComponentBuilders";

//const removeSubCat = () => {
//  const holder = document.querySelector("#rootSubcategories");
//  var doesExist = document.querySelectorAll(".testing");
//
//  if (holder.contains(doesExist[0])) {
//    for (let i = 0; i < doesExist.length; i++) {
//      doesExist[i].remove();
//    }
//  }
//};
const renderRoot = (
  renderElement,
  renderPlace = document.querySelector("#root")
) => {
  render(renderElement, renderPlace);
};
const RenderProducts = (ARRAY_NAME = []) => {
  console.log(ARRAY_NAME);
  var button = document.createElement("button").cloneNode(true);
  var clone = button.cloneNode(true);

  var renderingSpace = document.querySelector("#root");
  for (let i = 0; i < ARRAY_NAME.length; i++) {
    clone.textContent = ARRAY_NAME[i];
    renderingSpace.appendChild(clone.cloneNode(true));
  }
};
const ButtonBuilder2 = (props) => {
  const catBtn = props.el;

  return catBtn.map((el) => {
    return (
      <>
        <button className="cat-btn btn categories-button mb-2 mx-auto text-white bg-dark">
          {el}
        </button>
      </>
    );
  });
};

const RenderProducts2 = (props) => {
  const el = props.el;
  const img = props.img;

  return el.map((val, i) => {
    const convImg = img[i];
    console.log("workewd");
    return (
      <>
        <form action="/addProductToBasket/" method="post">
          <input type="hidden" value={CSRF_TOKEN} />
          <input type="hidden" name="id" value="5" />
          <button type="submit" className="product">
            <img src={convImg} />
            <p>{val}</p>
          </button>
        </form>
      </>
    );
  });
};
const addEvent = (elements = []) => {
  for (let i = 0; i < elements.length; i++) {
    console.log(elements[i]);
    elements[i].addEventListener("click", () => {
      switch (elements[i].textContent) {
        case `${SUBCATS_NAME[1][0]}`:
          //RenderProducts(TEST_ARRAY)
          renderRoot(
            renderInSubRoot(
              <RenderProducts2 el={TEST_ARRAY} img={imgArr} />,
              "product-holder animate__animated animate__zoomInDown"
            )
          );//renders products
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
          renderRoot(<RenderProducts2 el={TEST_ARRAY2} />);
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
    if (isActive) {
      body.style.overflow = "hidden";
      body.style.overflowX = "hidden";
    } else {
      body.style.overflow = "auto";
      body.style.overflowX = "hidden";
    }
  };

  return (
    <>
      <nav className="product-nav bg-black z-index-3 transform-z-3 position-sticky top-0 w-100 d-flex flex-wrap justify-content-center m-auto p-3 gap-3 nav-products">
        <button
          className="btn btn-lg bg-transparent prodNav-btn text-white"
          onClick={() => {
            ToggleClass();
            //renderTry(TEST_ARRAY2);
            addEvent(document.querySelectorAll(".cat-btn"), TEST_CAT); //adds event to subcategory
            render(
              <ButtonBuilder2 el={TEST_CAT} />,
              document.querySelector("#categories")
            );//creates category buttons

            //buttonBuilder2(TEST_CAT)
            //buttonBuilder(TEST_CAT);
            RenderFromCat(TEST_ARRAY); //elements that are rendered after clicking subcategory
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
            className="bg-dark col-md rootSubcategories mx-auto d-flex flex-row flex-wrap gap-2 p-2 "
          ></div>
        </div>
      </section>
    </>
  );
};
export { addEvent, RenderProducts2 };
export default ProductNav;
