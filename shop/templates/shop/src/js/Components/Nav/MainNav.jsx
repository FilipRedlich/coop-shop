import React from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
//imported components
import Login from "../Login/Login";
import Cart from "../Cart/Cart";
import { MainContent } from "../Home/MainContent";

const MainNav = () => {
  return (
    <>
<<<<<<< Updated upstream
    <nav className="main-nav">
          <Link className="main--nav-link" to={'/'}>
               
                      <h3
                        className="main--nav-name"
                        role="button"
                        
                      >
                        PESTKA
                      </h3>
          </Link>
    


        <div className="main--nav-user">
            <p className="main---nav--user-name">{currentUser}</p>
           
              <Link to={'/cart'}>
                <button
                  className="main---nav--user-button"
                >
                  Shopping cart
                </button>
              </Link>
              <Link to={'/login'}>
                <button
                  className="main---nav--user-button"
                
                >
                  Login
                </button>
              </Link>
      
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
