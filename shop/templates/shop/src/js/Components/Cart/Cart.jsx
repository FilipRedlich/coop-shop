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
<<<<<<< Updated upstream
        <div
          id="card-items"
          className="cart-items"
        >
          <HowManyItems el={basketProducts} />
          {/* cardContentsTest or CardContents*/}
=======
        <div id="card-items" className="cart-items">
          <HowManyItems el={basketProducts} />
>>>>>>> Stashed changes
        </div>
        <div className="checkout">
          <CheckOut />
        </div>
      </section>
    </>
  );
};
export default Cart;
