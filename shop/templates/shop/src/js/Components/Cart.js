import React, { useEffect } from "react";
import { render } from "react-dom";
import images from "./Images";
import MainContent from "./MainContent";
import { renderRoot } from "./RenderScripts";
import { basketProductsTest, cartContentsTest } from "./Test";
const TotalPrice = (props) => {
  const CurrentPrice = props.price;
  var convertedPrice = 0; //Converted price to integer

  CurrentPrice.map((x) => {
    convertedPrice += parseInt(x[5] * x[6]);
  });

  if (isNaN(convertedPrice)) {
    return 0 + "$";
  } else {
    return convertedPrice + "$";
  }
};
const HowManyItems = (props) => {
  const items = props.el;
  if (
    items.length === 0 ||
    items === undefined ||
    items === null ||
    items === NaN ||
    items[0][0] === ""
  ) {
    console.log("there are no items in cart");
    return (
      <div className="cart-item text-center p-2 w-100 bg-dark rounded m-auto">
        <div className="lead p-3">
          <h3>We didn't find any items in your cart!</h3>
          <p>
            Return to
            <span
              className="text-danger back-btn px-2"
              onClick={() => {
                renderRoot(<MainContent />);
              }}
            >
              homepage
            </span>
            to continue shopping
          </p>
        </div>
      </div>
    );
  } else {
    console.log("there are items in cart");
    return items.map((x, i) => {
      //if the price is lower than regular price, assign to variable regular price (It's used to show old price, before applying discount)
      if (x[5] * x[6] < x[5]) {
        var prevPrice = `${x[5]}$`; //Price before discount
      } else {
        console.log("price is the same");
      }
      return (
        <div className="cart-item d-flex gap-3 flex-row flex-wrap justify-content-between p-2 w-100 rounded m-auto">
          <div className="d-flex flexb-50 gap-3 flex-row flex-wrap">
            <img src={x[2]} className="cart-img" alt={x[1]} loading="lazy" />
            <h4 className="my-auto item-name">{x[1]}</h4>
          </div>
          <div className="d-flex flexb-50 flex-row gap-3  text-center ml-auto justify-content-center position-relative">
            <form className="quantity-form">
              <select className="quantity-select">
                <CreateOptions howMany={x} />
              </select>
            </form>
            <div className="d-flex flex-column justify-content-center">
              <p className="item-prevPrice">{prevPrice}</p>
              <h5 className="text-purple">{`${x[5] * x[6]}$`}</h5>
              <h6 className="text-muted">{`In stock: ${x[4]}`}</h6>
            </div>
            <form
              className="my-auto"
              action="/deleteProductToBasket/"
              method="POST"
            >
              <input type="hidden" name="id" value={x[0]} />
              <input
                type="hidden"
                name="csrfmiddlewaretoken"
                value={CSRF_TOKEN}
              />
              <button type="submit" className="btn remove-item my-auto">
                <i className="bi bi-trash"></i>
              </button>
            </form>
          </div>
        </div>
      );
    });
  }
};
const CreateOptions = (props) => {
  const howMany = props.howMany;
  //console.log(howMany);
  let n = parseInt(howMany[9]);
  console.log(n);
  return [...Array(n)].map((elementInArray, index) => (
    <option className="quantity-option" key={index}>
      {index + 1}
    </option>
  ));
};
const Cart = () => {
  return (
    <>
      <section
        id="cart"
        className="cart text-purple d-flex flex-row flex-wrap gap-2 p-2 animate__animated animate__backInRight"
      >
        <div
          id="card-items"
          className="cart-items d-flex flex-column flex-wrap  flexb-70 m-auto gap-3 p-3 bg-black rounded"
        >
          <HowManyItems el={basketProductsTest} />{" "}
          {/* cardContentsTest or CardContents*/}
        </div>
        <div className="checkout m-auto bg-black rounded">
          <form className="checkout-form d-flex flex-column justify-content-around p-3 ">
            <div className="flexb-70">
              <label className="text-muted">Subtotal:</label>
              <h5>{<TotalPrice price={basketProductsTest} />}</h5>
              <p className="text-muted">{`+ Delivery`}</p>
            </div>
            <input
              className="checkout-submit flexb-30 btn btn-lg text-dark "
              type="submit"
              value="Checkout"
            />
          </form>
        </div>
      </section>
    </>
  );
};
export { HowManyItems };
export default Cart;
