import { render } from "react-dom";

const TEST_CAT = ["cat1", "cat2", "cat3"];
const TEST_ARRAY = [
  "Test Element num.1",
  "Test element num.2",
  "Test element num.3",
  "Test element num.4",
];
const TEST_ARRAY2 = ["test1", "test2", "test3", "test4"];

const AfterLoad = (element, renderPlace = null, time = 1000) => {
  
  setTimeout(() => {
    console.log(element, renderPlace)
    render(element, renderPlace)
  }, time)
  return
}
const renderTry = (ARRAY = []) => {
  const addContent = () => {
    var button = document.createElement("button").cloneNode(true);
    var clone = button.cloneNode(true);
    clone.classList.add("minmax-test");
    var renderPlacement = document.querySelector("#rootSubcategories");

    //while (renderPlacement.firstChild) {
    //  renderPlacement.firstChild.remove();
    //}

    for (let i = 0; i < ARRAY.length; i++) {
      clone.textContent = ARRAY[i];
      clone.classList.add("testing");
      renderPlacement.appendChild(clone.cloneNode(true));
      //console.log(clone.textContent)
    }

    console.log("pds");
    console.log("fefee");
  };

  addContent();
};
renderTry();
export { TEST_CAT, TEST_ARRAY, TEST_ARRAY2 };
export { AfterLoad };
export default renderTry;
