import React from "react";
import { basketProductsTest, cartContentsTest } from "../utility/Test";
import HowManyItems from "./HowManyItems";
import CheckOut from "./Checkout";
//imported components

const Cart = () => {
  return (
    <>
      <section
        id="cart"
        className="cart animate__animated animate__backInRight"
      >
        <div id="card-items" className="cart-items">
          <HowManyItems el={basketProducts} />
        </div>
        <div className="checkout">
          <CheckOut />
        </div>
      </section>
    </>
  );
};
export default Cart;
