import { useState } from "react";
import { render } from "react-dom";

//components
import OnSale from "./OnSale";
import Services from "./Services";
import Outlet from "./Outlet";
import Newsletter from "./Newsletter";
import renderTry from "./Test";
import { TEST_ARRAY } from "./Test";

const addEvent = (elements = [],  ARRAY = [], ADDITIONAL_ARRAY = []) => {
  //const allSubCat = document.querySelectorAll('.testing');
  
  for (let i = 0; i < elements.length; i++) {
    console.log(elements[i])
    elements[i].addEventListener("click", () => {


      switch (elements[i].textContent) {
        case `${ARRAY[0]}`:
          alert("it works hah");
          break;
        case `${ARRAY[1]}`:
          alert('second el'); 
          break;
        default: 
          alert('SOMETHING FUCKED UP ONCE AGAIN')
          
     }
     
      //if (elements[i].textContent.includes('num')) {
      //  alert('hehe')
      //}
    });
  }


  return(
    <>
    </>
  )
}


const ProductNav = () => {
  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive);
  };

  const buttonBuilder = () => {
    //Creates buttons, adds classes and text to them
    var button = document.createElement("button").cloneNode(true);
    var clone = button.cloneNode(true);
    var holder = document.querySelector(".categories");
    let isExisting = document.querySelector(".cat-btn");
    
    //Adding details to button
    clone.classList.add(
      "cat-btn",
      "btn",
      "categories-button",
      "mb-2",
      "mx-auto",
      "text-white",
      "bg-dark"
    );

    //console.log(button)
    console.log(clone);

    if (holder.contains(isExisting)) {
      console.log("it exists so I wont add more buttons");
      return;
    }
    if (!holder.contains(isExisting)) {
      for (let i = 0; i < arrayOfCategories.length; i++) {
        clone.textContent = arrayOfCategories[i];
        holder.appendChild(clone.cloneNode(true));
        
      }
      return;
    }
  }
  const addFunc = () =>{
    let xx = document.querySelectorAll('.testtt')
    console.log(xx)
  }
  addFunc()

  const renderRoot = (renderElement) => {
    render(renderElement, document.querySelector('#root'))
  }
  
  return (
    <>
      <nav className="product-nav bg-transparent-custom z-index-3 transform-z-3 position-sticky top-0 w-100 d-flex flex-wrap justify-content-center m-auto p-3 gap-3 nav-products">
        <button
          className="btn btn-lg bg-transparent  text-white"
          onClick={() => {
            ToggleClass();
            renderTry(TEST_ARRAY);
            addEvent(document.querySelectorAll('.testing'), TEST_ARRAY)
            buttonBuilder();
            
          }}
        >
          Categories
        </button>
        <button className="btn btn-lg bg-transparent  text-white"
        onClick={()=>{
          renderRoot(<OnSale />)
          //RenderSale();
        }}>
          On sale
        </button>
        <button className="btn btn-lg bg-transparent  text-white"
        onClick={()=>{
          renderRoot(<Outlet />)
          //RenderOutlet();
        }}>
          Outlet
        </button>
        <button className="btn btn-lg bg-transparent  text-white"
        onClick={()=>{
        renderRoot(<Services />)
          //RenderServices();
        }}>
          Services
        </button>
        <button className="btn btn-lg bg-transparent  text-white"
        onClick={()=>{
          renderRoot(<Newsletter />)
          //RenderNewsletter();
        }}>
          Newsletter
        </button>
      </nav>

      <section
        className={
          isActive
            ? "hide-element w-100 position-fixed z-index-1 mx-auto"
            : "position-fixed rounded categories-top text-white w-100 min-vh-200 z-index-1 translate-middle-x start-50 bg-transparent-custom blur-bg px-1 mx-auto transition-5 min-h-rem"
        }
      >
        <div className="row categories-wrapper gap-3 p-2 w-100 mt-5">
          <div
            id="categories"
            className="text-left categories col-3 no-gutters gap-1"
          //Inside this element buttons are rendered
          ></div>

          <div id="rootSubcategories" className="bg-dark col-md categories-products mx-auto d-flex">
            
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductNav;
