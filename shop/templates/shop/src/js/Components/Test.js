import { render } from "react-dom";
import image1 from "../../images/undraw_dev_productivity_re_fylf.svg";
import image2 from "../../images/undraw_dev_productivity_re_fylf.svg";
const imgArr = [image1, image2];
const TEST_CAT = ["cat1", "cat2", "cat3"];
const TEST_ARRAY = [
  "Test Element num.1",
  "Test element num.2",
  "Test element num.3",
  "Test element num.4",
  'dsdsdsd',
  'fdhgdhdsh',
  'fdfdfdfdfd', 
  'ffdsfsfsf', 
  'fdfdfdfdf', 
  'hgahvb',
  'fdhgdhdsh',
  'fdfdfdfdfd', 
  'ffdsfsfsf', 
  'fdfdfdfdf', 
  'fdhgdhdsh',
  'fdfdfdfdfd', 
  'ffdsfsfsf', 
  'fdfdfdfdf', 
];
const TEST_ARRAY2 = ["test1", "test2", "test3", "test4"];

const AfterLoad = (element, renderPlace = null, time = 1000) => {

  setTimeout(() => {
    console.log(element, renderPlace)
    render(element, renderPlace)
  }, time)
  console.log('cwelskop')
  return
}
const renderTry = (ARRAY_NAME = [], ARRAY_IMG = []) => {
  const addContent = () => {
    var button = document.createElement("button").cloneNode(true);
    var clone = button.cloneNode(true);
    var IMAGE_PATH = ARRAY_IMG;
    var img = document.createElement('img')
    
    clone.classList.add("subcategory");
    var renderPlacement = document.querySelector("#rootSubcategories");

 
    for (let i = 0; i < ARRAY_NAME.length; i++) {
      clone.textContent = ARRAY_NAME[i];
      clone.classList.add("testing");
      img.setAttribute('src', ARRAY_IMG[0]);
      console.log(ARRAY_IMG[0], 'pojebie mnie')
      clone.appendChild(img.cloneNode('true'));
      renderPlacement.appendChild(clone.cloneNode(true));
      //console.log(clone.textContent)
    }

    console.log("pds");
    console.log("fefee");
  };

  addContent();
};


export { TEST_CAT, TEST_ARRAY, TEST_ARRAY2, imgArr };
export { AfterLoad, renderTry};

