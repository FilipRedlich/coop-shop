import { useState } from "react";
import { render } from "react-dom";

//components
import OnSale from "./OnSale";
import Services from "./Services";
import Outlet from "./Outlet";
import Newsletter from "./Newsletter";
import renderTry from "./Test";
import {TEST_CAT, TEST_ARRAY, TEST_ARRAY2 } from "./Test";


  const removeSubCat = () => {
    const holder = document.querySelector("#rootSubcategories");
    var doesExist = document.querySelectorAll(".testing");

    if (holder.contains(doesExist[0])) {
      for (let i = 0; i < doesExist.length; i++){
        doesExist[i].remove()
      }
    }
   
  };

const addEvent = (elements = [],  ARRAY = [], ADDITIONAL_ARRAY = []) => {
  
  for (let i = 0; i < elements.length; i++) {
    console.log(elements[i]);

    elements[i].addEventListener("click", () => {


      switch (elements[i].textContent) {
        case `${TEST_ARRAY[0]}`:
          alert("it works hah");
          break;
        case `${TEST_ARRAY[1]}`:
            alert('testt');
          break;
        case `${TEST_ARRAY[2]}`:
         alert() 
        break;
        case `${TEST_ARRAY[3]}`:
          alert('4th el')
          break;

     }
      switch(elements[i].textContent){
            case `${TEST_ARRAY2[0]}`:
              alert('hehe')
              break;
            case `${TEST_ARRAY2[1]}`:
              alert('er')

          }
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
      //for (let i = 0; i < arrayOfCategories.length; i++) {
      //  clone.textContent = arrayOfCategories[i];
      //  holder.appendChild(clone.cloneNode(true));
      //  
      //}
      for(let i = 0; i< TEST_CAT.length; i++){
        clone.textContent = TEST_CAT[i]
        holder.appendChild(clone.cloneNode(true));
      }
      return;
    }
  }
  const RenderFromCat = (ARRAY = []) =>{
    const categories = document.querySelectorAll('.categories-button');
    
    for(let i = 0; i<ARRAY.length; i++){
      categories[i].addEventListener('click', () => {
        removeSubCat(); //removes all previous rendered subcategories
        //adds function to specified subcategory
        switch (ARRAY[i]) {
          case `${ARRAY[0]}`:
            //renderTry(ARRAY_3_SUBCATEGORY);
            renderTry(TEST_ARRAY);
            addEvent(document.querySelectorAll(".testing"));
            break;
          case `${ARRAY[1]}`:
            renderTry(TEST_ARRAY2);
            addEvent(document.querySelectorAll(".testing"));
            break;
        }
      })
    }
    
  }
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
           //renderTry(TEST_ARRAY2);
            addEvent(document.querySelectorAll('.testing'), TEST_CAT)
            buttonBuilder();
            RenderFromCat(TEST_ARRAY, removeSubCat)
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
export {removeSubCat}
export default ProductNav;
