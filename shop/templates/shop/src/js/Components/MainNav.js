
import react from "react";
import { render } from "react-dom";
import { useState } from "react";


//imported components
import Login from './Login';
import MainApp from "../App";


const MainNav = () => {

 
  
  return (
    <nav className="w-100 bg-black position-relative  z-index-3 transform-z-3 d-flex flex-wrap justify-content-between gap-3 p-2">
      <div className="row m-auto w-100 gap-3">
        <div className="col m-auto">
          <h1 className="text-white text-center"
            role='button'
            onClick={() => {
              console.log('MainNav')
            render(<MainApp />, document.querySelector('#root'))
          }}
          >SKLEP</h1>
          
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
          <div className="d-flex gap-3 justify-content-end">
            <button className="btn text-white bg-dark">Shopping cart</button>
            <button className="btn text-white bg-dark"
              onClick={() => {
              console.log("MainNav");
              render(<Login />, document.querySelector("#root"));
            }}
            >Login</button>
            <button className="btn text-white bg-dark">Register</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
