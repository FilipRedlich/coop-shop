import React from "react";
import { render } from "react-dom";

//imported components
import Login from "../Login/Login";
import Cart from "../Cart/Cart";
import { MainContent } from "../Home/MainContent";

const MainNav = () => {
  return (
    <>
<<<<<<< Updated upstream
    <nav className="main-nav">
  
          <h3
            className="main--nav-name"
            role="button"
            onClick={() => {
              console.log("MainNav");
              render(<MainContent />, document.querySelector("#root"));
            }}
          >
            PESTKA
          </h3>
    


        <div className="main--nav-user">
            <p className="main---nav--user-name">{currentUser}</p>
           
              <button
                className="main---nav--user-button"
                onClick={() => {
                  render(<Cart />, document.querySelector("#root"));
                }}
              >
                Shopping cart
              </button>
              <button
                className="main---nav--user-button"
                onClick={() => {
                  console.log("MainNav");
                  render(<Login />, document.querySelector("#root"));
                }}
              >
                Login
              </button>
      
        </div>
=======
      <nav className="main-nav">
        <Link className="main--nav-link" to={"/"}>
          <h3 className="main--nav-name" role="button">
            PESTKA
          </h3>
        </Link>

        <div className="main--nav-user">
          <p className="main---nav--user-name">{currentUser}</p>
>>>>>>> Stashed changes

          <Link to={"/cart"}>
            <button className="main---nav--user-button">Shopping cart</button>
          </Link>
          <Link to={"/login"}>
            <button className="main---nav--user-button">Login</button>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default MainNav;
