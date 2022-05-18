import React from "react";
import { useState } from "react";
import { render } from "react-dom";

//components
import OnSale from "./OnSale";
import Services from "./Services";
import Outlet from "./Outlet";
import Newsletter from "./Newsletter";
import { RenderFromCat, renderInSubRoot, renderRoot } from "./RenderScripts";
import { ButtonBuilder2 } from "./ComponentBuilders";
import {
  TEST_SUBCAT_NAME,
  TEST_CAT,
  TEST_ARRAY,
  TEST_ARRAY2,
  TEST_PRODUCT,
} from "./Test";


const showPopup = () => {
  const popup = document.querySelector(".popup-modal");

  const newPos = () => {
    popup.style.transform = "translateX(-50%) translateY(-2rem)";
  };
  const backToPrevPos = () => {
    popup.style.transform = "translateX(-50%) translateY(5rem)";
  };
  newPos(); //Sets position to show popup after user clicks product
  setTimeout(backToPrevPos, 1500); //Sets timeout to hide element after 1.5s
  console.log("showPopup function"); //Debug
};
const Popup = (props) => {
  const el = props.el;

  return (
    <>
      <div className="popup-modal">
        <i className="popup-success"></i>
        <h5 className="popup-message">Product has been added successfully!</h5>
      </div>
    </>
  );
};
const RenderProducts2 = (props) => {
  const el = props.el;
  const img = props.img;
  const specIndex = props.index; //specified index that represents subcategory (CPU or Cooler for ex.)
  //it's then used to create another array containing information about products (from subcategories)
  return el[specIndex].map((val, i) => {
    const convImg = val[2]; //Array of images, 2 is ID where image is (for ex. 0 is ID, 1 name, 2 img)
    const itemID = val[0];
    //console.log(convImg, "converted Img line 58 ProductsNav");
    console.log(val[0], "ITEM ID RenderProducts2 in ProductsNav");
    return (
      <>
        <form action="/addProductToBasket/" method="post">
          <input type="hidden" name="csrfmiddlewaretoken" value={CSRF_TOKEN} />
          <input type="hidden" name="id" value={itemID} />
          <button
            type="submit"
            className="product"
            onClick={(e) => {
              showPopup();
              e.preventDefault();
            }}
          >
            <img src={convImg} alt={val[1]} loading="lazy" />
            <p>{val[1]}</p>
          </button>
        </form>
      </>
    );
  });
};
//PRODUCTS_NAME[1][1][2]
const addEvent = () => {
  var subcatButtons = document.querySelectorAll(".subcategory");
  const initAddEvent = () => {
    if (subcatButtons[0].textContent === "Procesory") {
      subcatButtons.forEach((button, i) => {
        removeEventListener("click", button); //Makes sure that function won't be fired many times
        i++;
        console.log("1st cat addEvent func");
        button.addEventListener("click", () => {
          renderRoot(
            renderInSubRoot(
              <RenderProducts2 el={TEST_PRODUCT} index={i} />,
              "product-holder animate__animated animate__zoomInDown"
            )
          );
        });
      });
    }

    if (subcatButtons[0].textContent === "Komputery stacjonarne") {
      subcatButtons.forEach((button, i) => {
        removeEventListener("click", button);
        i += 9; //value before first index of next subcategory (for ex. 2nd subcat stars on 10th index)
        i++;
        console.log("2nd cat addEvent func");
        button.addEventListener("click", () => {
          renderRoot(
            renderInSubRoot(
              <RenderProducts2 el={PRODUCTS_NAME} index={i} />,
              "product-holder animate__animated animate__zoomInDown"
            )
          );
        });
      });
    }
  };

  initAddEvent();
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
          aria-labelledby="categories"
          onClick={() => {
            ToggleClass();
            //renderTry(TEST_ARRAY2);
            render(
              <ButtonBuilder2 el={arrayOfCategories} />,
              document.querySelector("#categories")
            ); //creates category buttons

            RenderFromCat(arrayOfCategories); //elements that are rendered after clicking subcategory
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
            className="bg-dark col-md rootSubcategories mx-auto justify-content-center d-flex flex-row flex-wrap gap-3 p-2 "
          ></div>
        </div>
      </section>
      <Popup />
    </>
  );
};
export { addEvent, RenderProducts2 };
export default ProductNav;
