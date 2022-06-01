import React from "react";
import { render } from "react-dom";

//imported components
import Login from "./Login";
import Cart from "./Cart/Cart";
import MainContent from "./MainContent";

const MainNav = () => {
  return (
    <nav className="w-100 bg-black position-relative  z-index-3 transform-z-3 d-flex flex-wrap justify-content-between gap-3 p-2">
      <div className="row m-auto w-100 gap-3">
        <div className="col m-auto">
          <h1
            className="text-white text-center"
            role="button"
            onClick={() => {
              console.log("MainNav");
              render(<MainContent />, document.querySelector("#root"));
            }}
          >
            SKLEP
          </h1>
        </div>

        <div className="col min-rem m-auto">
          <form className="form d-flex">
            <input
              className="form-control shadow-lg"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn bg-dark text-white" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="col m-auto">
          <div className="d-flex flex-wrap gap-3 justify-content-end">
            <p className="my-auto text-white mainNav-btn">{currentUser}</p>
            <div className="d-flex gap-3 ">
              <button
                className="btn text-white mainNav-btn bg-dark"
                onClick={() => {
                  render(<Cart />, document.querySelector("#root"));
                }}
              >
                Shopping cart
              </button>
              <button
                className="btn text-white mainNav-btn bg-dark"
                onClick={() => {
                  console.log("MainNav");
                  render(<Login />, document.querySelector("#root"));
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
