import { render } from "react-dom";
import image1 from "../../images/undraw_dev_productivity_re_fylf.svg";
import image2 from "../../images/undraw_software_engineer_re_fyew.svg";
const imgArr = [image2, image1];
const TEST_CAT = ["cat1", "cat2", "cat3"];
const TEST_ARRAY = [
  "Test Element num.1",
  "Test element num.2",
  "Test element num.3",
  "Test element num.4",
  "dsdsdsd",
  "fdhgdhdsh",
  "fdfdfdfdfd",
  "ffdsfsfsf",
  "fdfdfdfdf",
  "hgahvb",
  "fdhgdhdsh",
  "fdfdfdfdfd",
  "ffdsfsfsf",
  "fdfdfdfdf",
  "fdhgdhdsh",
  "fdfdfdfdfd",
  "ffdsfsfsf",
  "fdfdfdfdf",
];
const TEST_ARRAY2 = ["test1", "test2", "test3", "test4"];
const catNamesTest = [
  "Podzespoły komputerowe",
  "Komputery",
  "Gaming",
  "Smartfony",
  "Telewizory",
  "Audio",
];
const basketProductsTest = [
  [
    "5",
    "Dysk SSD Crucial MX500 500 GB 2.5&quot; SATA III",
    "",
    "10",
    "4",
    "270.0",
    "1.0",
    "3.0",
    "False",
    "5",
  ],
  [
    "8",
    "Komputer Lenovo IdeaCentre Gaming 5i, Core i5-10400F, 16 GB, RTX 3060, 512 GB M.2 PCIe",
    "/static/shop/img/test.jpg",
    "5",
    "5",
    "5120.0",
    "1.0",
    "3.0",
    "False",
    "1",
  ],
  [
    "9",
    "Serwer Dell PowerEdge T40",
    "",
    "6",
    "10",
    "5947.0",
    "1.0",
    "3.0",
    "False",
    "6",
  ],
  [
    "10",
    "Serwer Dell PowerEdge T140",
    "",
    "6",
    "4",
    "7454.0",
    "1.0",
    "3.0",
    "False",
    "1",
  ],
  [
    "12",
    "Monitor Samsung Odyssey G3A",
    "",
    "7",
    "8",
    "990.0",
    "0.5",
    "3.0",
    "False",
    "1",
  ],
];
const subcatNamesTest = [
  [""],
  [
    "Procesory",
    "Płyty główne",
    "Pamięć RAM",
    "Karty graficzne",
    "Dyski SSD",
    "Dyski HDD",
    "Zasilacze",
    "Chłodzenie CPU",
    "Pasty termoprzewodzące",
  ],
  ["Komputery stacjonarne", "Serwery", "Monitory", "Software"],
  [""],
  [""],
  [""],
  [""],
  [""],
  [""],
  [""],
];
const subcatImagesTest = [
  image1,
  image2
]
const discountItemsTest = [
  [
    "12",
    "Monitor Samsung Odyssey G3A",
    "",
    "7",
    "8",
    "990.0",
    "0.5",
    "3.0",
    "False",
  ],
  ["13", "Monitor Asus VZ24EHE", "", "7", "8", "770.0", "0.8", "3.0", "True"],
  [
    "28",
    "Karta graficzna Asus TUF GeForce GTX 1660Ti Gaming Evo OC 6GB GDDR6",
    "",
    "15",
    "4",
    "2300.0",
    "0.8",
    "3.0",
    "False",
  ],
];
const hotshotTest = [
  "13",
  "Monitor Asus VZ24EHE",
  "",
  "7",
  "8",
  "770.0",
  "0.7",
  "3.0",
  "True",
];
const AfterLoad = (element, renderPlace = null, time = 1000) => {
  setTimeout(() => {
    console.log(element, renderPlace);
    render(element, renderPlace);
  }, time);
  console.log("cwelskop");
  return;
};
const renderTry = (ARRAY_NAME = [], ARRAY_IMG = []) => {
  const addContent = () => {
    var button = document.createElement("button").cloneNode(true);
    var clone = button.cloneNode(true);
    var IMAGE_PATH = ARRAY_IMG;
    var img = document.createElement("img");

    clone.classList.add("subcategory");
    var renderPlacement = document.querySelector("#rootSubcategories");

    for (let i = 0; i < ARRAY_NAME.length; i++) {
      clone.textContent = ARRAY_NAME[i];
      clone.classList.add("testing");
      img.setAttribute("src", ARRAY_IMG[0]);
      console.log(ARRAY_IMG[0], "pojebie mnie");
      clone.appendChild(img.cloneNode("true"));
      renderPlacement.appendChild(clone.cloneNode(true));
      //console.log(clone.textContent)
    }

    console.log("pds");
    console.log("fefee");
  };

  addContent();
};

export {
  subcatNamesTest,
  subcatImagesTest,
  catNamesTest,
  basketProductsTest,
  hotshotTest,
  TEST_CAT,
  TEST_ARRAY,
  TEST_ARRAY2,
  imgArr,
  discountItemsTest
};
export { AfterLoad, renderTry };
