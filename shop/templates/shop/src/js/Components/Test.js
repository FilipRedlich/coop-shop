import React from "react";
import { render } from "react-dom";


const TEST_ARRAY = [
  "Test Element num.1",
  "Test element num.2",
  "Test element num.3",
  "Test element num.4",
];

const renderTry = (ARRAY = []) => {
  const addContent = () => {
    var button = document.createElement("button").cloneNode(true);
    var clone = button.cloneNode(true);
    var renderPlacement = document.querySelector('#rootSubcategories');
    const doesExist = document.querySelectorAll('.testing')
    
    //while (renderPlacement.firstChild) {
    //  renderPlacement.firstChild.remove();
    //}
      
      
      for (let i = 0; i < ARRAY.length; i++) {
  
        clone.textContent = ARRAY[i];
        clone.classList.add('testing')
        renderPlacement.appendChild(clone.cloneNode(true));
        //console.log(clone.textContent)
      }
    
    console.log('pds')
    console.log('fefee')

  };
  
  addContent();
  
  return (
    <>

    </>
  )

};
renderTry()
export { TEST_ARRAY };
export default renderTry;
