import React, { createRef } from "react";
import { useState } from "react";
import { render } from "react-dom";

//components
import OnSale from "../OnSale/OnSale";
import Newsletter from "../Newsletter/Newsletter";
import MainNav from "./MainNav";
import { RenderFromCat, renderInSubRoot, renderRoot } from "../utility/RenderScripts";
import { ButtonBuilder2 } from "../utility/ComponentBuilders";
import {
  TEST_SUBCAT_NAME,
  TEST_CAT,
  TEST_ARRAY,
  TEST_ARRAY2,
  prod,
  productsTest,
  catNamesTest,
} from "../utility/Test";



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
  const message = props.text;

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
            }}
          >
            <img src={val[2]} alt={val[1]} loading="lazy" />
            <p>{val[1]}</p>
          </button>
        </form>
      </>
    );
  });
};

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
              <RenderProducts2 el={products} index={i} />,
              "product-holder animate__animated animate__zoomInDown"
            )
          );
        });
      });
    }

    if (subcatButtons[0].textContent === "Komputery stacjonarne") {
      subcatButtons.forEach((button, i) => {
        removeEventListener("click", button);
        i += 9; //value before first index of next subcategory (for ex. 2nd subcat starts on 10th index)
        i++;
        console.log("2nd cat addEvent func");
        button.addEventListener("click", () => {
          renderRoot(
            renderInSubRoot(
              <RenderProducts2 el={products} index={i} />,
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
  const categoriesMain = createRef(null);

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
      <div onClick={(e) => {
        let myTarget = e.target; console.log(myTarget.className == 'categories---main--container-category');

        if (
          categoriesMain.current.classList[1] == 'animateShowCategories' &&
          !myTarget.className !== 'product-nav' &&
          myTarget.className !== 'categories---main--container-category'
        ) {
          console.log('');
          ToggleClass();
          return
        } else {
          return
        }
      }}>
        <MainNav />
        <nav className="product-nav">
          <button
            className="product--nav-button"
            aria-labelledby="categories button"
            onClick={() => {
              ToggleClass();
              render(
                <ButtonBuilder2 el={catNames} />,
                document.querySelector("#categories")
              ); //creates category buttons
              RenderFromCat(catNames); //elements that are rendered after clicking subcategory
            }}
          >
            Categories
          </button>
          <button
            className="product--nav-button"
            onClick={() => {
              renderRoot(<OnSale />);
            }}
          >
            On sale
          </button>
          <button
            className="product--nav-button"
            onClick={() => {
              renderRoot(<Newsletter />);
            }}
          >
            Newsletter
          </button>
        </nav>
        <section
          id="categoriesMain"
          ref={categoriesMain}
          className={`
           categories-main
           ${isActive
              ? "animateCloseCategories "
              : "animateShowCategories bg-transparent-custom blur-bg"
            }`}
        >
          <div
            id="categories"
            className="categories--main-container"
          //Inside this element buttons are rendered
          >
          </div>
          <div
            id="rootSubcategories"
          ></div>
        </section>
      </div>
      <Popup />
    </>
  );
};
export { addEvent, RenderProducts2 };
export default ProductNav;
