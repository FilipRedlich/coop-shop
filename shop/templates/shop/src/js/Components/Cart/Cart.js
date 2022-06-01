import React from "react";
import { basketProductsTest, cartContentsTest } from "../Test";
import HowManyItems from "./HowManyItems";
import CheckOut from "./Checkout";
//imported components

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
        <CheckOut />
        </div>
      </section>
    </>
  );
};
export default Cart;
