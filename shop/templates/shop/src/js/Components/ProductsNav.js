import { useState } from "react";
import Smth from "./Test";
const watchForMove = (el) => {
    const watchedElement = document.querySelector('.gallery');
    const observer = new IntersectionObserver((e) => {
      console.log(e)
    },{
      rootMargin: '0px 0px 0px 0px',
      threshold: 1.0
    })
  //observer.observe(watchedElement)
}

const ProductNav = () => {
  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive);
  };
   function buttonBuilder() {
     var button = document.createElement("button");
     var clone = button.cloneNode(true);
     var holder = document.querySelector(".categories");
     clone.textContent = "Cloned text for button";
     //console.log(button)
     console.log(clone);
  
       holder.appendChild(clone);
    
   }
  
  
  return (
    <>
    
      <nav className="product-nav bg-transparent-custom z-index-3 transform-z-3 position-sticky top-0 w-100 d-flex flex-wrap justify-content-center m-auto p-3 gap-3 nav-products">
        <button
          className="btn btn-lg bg-transparent  text-white"
          onClick={() => { ToggleClass();buttonBuilder();}}
        >
          Categories
        </button>
        <button className="btn btn-lg bg-transparent  text-white">
          On sale
        </button>
        <button className="btn btn-lg bg-transparent  text-white">
          Outlet
        </button>
        <button className="btn btn-lg bg-transparent  text-white">
          Services
        </button>
        <button className="btn btn-lg bg-transparent  text-white">
          Newsletter
        </button>
      </nav>

      <section
        id="categories"
        className={
          isActive
            ? "hide-element w-100 position-fixed z-index-1 mx-auto"
            : "position-fixed rounded text-white w-100 min-vh-200 z-index-1 translate-middle-x start-50 bg-transparent-custom blur-bg px-1 mx-auto transition-5 min-h-rem"
        }
      >
        <div className="row categories-wrapper gap-3 p-2 w-100 mt-5">
          <div
            id="categories"
            className="text-left categories  col-3 no-gutters gap-1"
          >
  
          </div>

          <div className="bg-dark col-md categories-products mx-auto d-flex">
            <ul>
              <li>dsds</li>
              <li>dsds</li>
              <li>dsds</li>
            </ul>
            <ul>
              <li>dsdsd</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
  
};
export {
  watchForMove
};
export default ProductNav;
