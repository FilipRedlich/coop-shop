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
const cartContentsTest = [
  [
    "5",
    "Dysk SSD Crucial MX500 500 GB 2.5&quot; SATA III",
    imgArr[0],
    "10",
    "4",
    "270.0",
    "1.0",
    "3.0",
    "False",
  ],
  [
    "7",
    "Dysk SSD Crucial BX200 SATA III",
    imgArr[0],
    "10",
    "3",
    "270.0",
    "1.0",
    "3.0",
    "False",
  ],
];
const TEST_PRODUCT = [
  [[""]],
  [
    [
      "3",
      "Procesor Intel Core i5-10400F, 2.9GHz, 12 MB, BOX",
      imgArr[0],
      "2",
      "5",
      "649.0",
      "1.0",
      "4.5",
      "False",
    ],
    [
      "4",
      "Procesor AMD Ryzen 7 5800X, 3.8GHz, 32 MB, BOX",
      imgArr[0],
      "2",
      "8",
      "1729.0",
      "1.0",
      "3.0",
      "False",
    ],
  ],
  [
    [
      "5",
      "Płyta główna Gigabyte B450 AORUS PRO",
      "",
      "3",
      "5",
      "380.0",
      "1.0",
      "3.0",
      "False",
    ],
    [
      "6",
      "Płyta główna Gigabyte B550 GAMING X V2",
      "",
      "3",
      "1",
      "470.0",
      "1.0",
      "3.0",
      "False",
    ],
  ],
  [
    [
      "7",
      "Pamięć Kingston Fury Beast, DDR4, 16 GB, 3200MHz, CL16",
      "",
      "4",
      "1",
      "358.0",
      "1.0",
      "3.0",
      "False",
    ],
    [
      "8",
      "Pamięć Corsair Vengeance, DDR4, 16 GB, 3200MHz, CL16",
      "",
      "4",
      "1",
      "350.0",
      "1.0",
      "3.0",
      "False",
    ],
  ],
  [
    [
      "9",
      "Karta graficzna PNY GeForce RTX 3060Ti Gaming Revel Epic-X RGB 8GB GDDR6",
      "",
      "5",
      "5",
      "3500.0",
      "1.0",
      "3.0",
      "False",
    ],
    [
      "10",
      "Karta graficzna Gigabyte GeForce GTX 1660 OC 6GB GDDR5",
      "",
      "5",
      "1",
      "1800.0",
      "1.0",
      "3.0",
      "False",
    ],
  ],
  [
    [
      "11",
      "Dysk SSD Kingston NV1 500 GB M.2 2280 PCI-E x4 Gen3 NVMe",
      "",
      "6",
      "1",
      "244.0",
      "1.0",
      "3.0",
      "False",
    ],
    [
      "12",
      "Dysk SSD Crucial MX500 500 GB 2.5&quot; SATA III",
      "",
      "6",
      "1",
      "277.0",
      "1.0",
      "3.0",
      "False",
    ],
  ],
  [[""]],
  [[""]],
  [[""]],
  [[""]],
  [
    [
      "13",
      "Komputer HP Pavilion Gaming TG01, Core i5-11400F, 16 GB, RTX 3060, 512 GB M.2 PCIe",
      "",
      "11",
      "2",
      "4799.0",
      "1.0",
      "3.0",
      "False",
    ],
    [
      "14",
      "Komputer Game X G500, Core i5-11400F, 16 GB, RTX 3060 Ti, 1 TB M.2 PCIe",
      "",
      "11",
      "2",
      "6000.0",
      "1.0",
      "3.0",
      "False",
    ],
  ],
  [[""]],
  [
    [
      "15",
      "Monitor Samsung Odyssey G3A",
      "",
      "13",
      "1",
      "940.0",
      "1.0",
      "3.0",
      "False",
    ],
    [
      "16",
      "Monitor Asus VZ24EHE",
      "",
      "13",
      "1",
      "690.0",
      "1.0",
      "3.0",
      "False",
    ],
  ],
  [[""]],
  [[""]],
  [[""]],
  [[""]],
  [[""]],
  [[""]],
  [[""]],
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

export { TEST_PRODUCT, TEST_CAT, TEST_ARRAY, TEST_ARRAY2, imgArr, cartContentsTest };
export { AfterLoad, renderTry };
