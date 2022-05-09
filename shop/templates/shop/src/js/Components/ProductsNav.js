import React from "react";
import { useState } from "react";
import { render } from "react-dom";

//components
import OnSale from "./OnSale";
import Services from "./Services";
import Outlet from "./Outlet";
import Newsletter from "./Newsletter";
import renderTry from "./Test";
import { TEST_SUBCAT_NAME, TEST_CAT, TEST_ARRAY, TEST_ARRAY2, TEST_PRODUCT } from "./Test";
import { RenderFromCat, renderInSubRoot } from "./RenderScripts";


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
  const specIndex = props.index; //specified index that represents subcategory (CPU or Cooler for ex.)
  //it's then used to create another array containing information about products (from subcategories)
  return el[specIndex].map((val, i) => {
    const convImg = val[2]; //Array of images
    console.log(convImg, 'KURWISKO')
    return (
      <>
        <form action="/addProductToBasket/" method="post">
          <input type="hidden" value={CSRF_TOKEN} />
          <input type="hidden" name="id" value="5" />
          <button type="submit" className="product">
            <img src={convImg} />
            <p>{val[1]}</p>
          </button>
        </form>
      </>
    );
  });
};
//PRODUCTS_NAME[1][1][2]
const addEvent = (elements = []) => {
  console.log(elements)
  for (let i = 0; i < elements.length; i++) {
    //console.log(elements[i].textContent);
    //each switch contains value of TEST_CAT/elements param, so for ex. first switch is cat1
    elements[i].addEventListener("click", () => {
      var subcatButtons = document.querySelectorAll('.subcategory');
      console.log(subcatButtons, 'tese')
      switch (subcatButtons[i].textContent) {
          case `${SUBCATS_NAME[1][0]}`:
            //RenderProducts(TEST_ARRAY)
                renderRoot(
                  renderInSubRoot(
                    <RenderProducts2 el={TEST_PRODUCT} index={1} />,
                    "product-holder animate__animated animate__zoomInDown"
                  )
                );
            break;
          case `${SUBCATS_NAME[2][0]}`:
                renderRoot(
                  renderInSubRoot(
                    <RenderProducts2 el={TEST_PRODUCT} index={2} />,
                    "product-holder animate__animated animate__zoomInDown"
                  )
                );
          break;
        }
      
      

    });
  }
};
//const AddEvent = () => {
//  
//}
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
            render(
              <ButtonBuilder2 el={TEST_CAT} />,
              document.querySelector("#categories")
            );//creates category buttons


            RenderFromCat(TEST_CAT); //elements that are rendered after clicking subcategory
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
