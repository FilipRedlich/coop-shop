import { render } from "react-dom";
import image1 from "../../../images/undraw_dev_productivity_re_fylf.svg";
import image2 from "../../../images/undraw_software_engineer_re_fyew.svg";
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
    "0.9",
    "3.0",
    "False",
    "1",
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
  [
    "28",
    "Karta graficzna Asus TUF GeForces GTX 1660Ti Gaming Evo OC 6GB GDDR6",
    "",
    "15",
    "4",
    "2300.0",
    "0.8",
    "3.0",
    "False",
    "3"
  ],
  [
    "28",
    "Karta graficzna Asus TUF GeForces GTX 1660Ti Gaming Evo OC 6GB GDDR6",
    "",
    "15",
    "4",
    "2300.0",
    "0.8",
    "3.0",
    "False",
    "2"
  ],
  [
    "28",
    "Karta graficzna Asus TUF GeForces GTX 1660Ti Gaming Evo OC 6GB GDDR6",
    "",
    "15",
    "4",
    "2300.0",
    "0.8",
    "3.0",
    "False",
    "3"
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
  [
    "28",
    "Karta graficzna Asus TUF GeForces GTX 1660Ti Gaming Evo OC 6GB GDDR6",
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
const productsTest = [
  [
      [
          ""
      ]
  ],
  [
      [
          "3",
          "Intel Core i5-10400F, 2.9GHz, 12 MB, BOX",
          "/static/shop/img/PRODUCTS/CPU_i5_10400F.jpg",
          "2",
          "5",
          "649.0",
          "1.0",
          "4.5",
          "False"
      ],
      [
          "4",
          "AMD Ryzen 7 5800X, 3.8GHz, 32 MB, BOX",
          "",
          "2",
          "8",
          "1729.0",
          "0.67",
          "3.0",
          "True"
      ]
  ],
  [
      [
          "5",
          "Gigabyte B450 AORUS PRO",
          "/static/shop/img/PRODUCTS/MOBO_AOURUS_PRO_B450.webp",
          "3",
          "5",
          "380.0",
          "1.0",
          "3.0",
          "False"
      ],
      [
          "6",
          "Gigabyte B550 GAMING X V2",
          "/static/shop/img/PRODUCTS/MOBO_GIGABYTE_GAMING_X_V2.jpg",
          "3",
          "21",
          "470.0",
          "0.87",
          "3.0",
          "False"
      ]
  ],
  [
      [
          "7",
          "Kingston Fury Beast, DDR4, 16 GB, 3200MHz, CL16",
          "/static/shop/img/PRODUCTS/RAM_KINGSTON_FURY_BEAST.webp",
          "4",
          "1",
          "358.0",
          "1.0",
          "3.0",
          "False"
      ],
      [
          "8",
          "Corsair Vengeance, DDR4, 16 GB, 3200MHz, CL16",
          "/static/shop/img/PRODUCTS/RAM_CORSAIR_VENGEANCE.webp",
          "4",
          "1",
          "350.0",
          "1.0",
          "3.0",
          "False"
      ]
  ],
  [
      [
          "9",
          "PNY GeForce RTX 3060Ti Gaming Revel Epic-X RGB 8GB GDDR6",
          "/static/shop/img/PRODUCTS/GPU_PNY_RTX_3060TI.webp",
          "5",
          "5",
          "3500.0",
          "1.0",
          "3.0",
          "False"
      ],
      [
          "10",
          "Gigabyte GeForce GTX 1660 OC 6GB GDDR5",
          "/static/shop/img/PRODUCTS/GPU_GIGABYTE_GTX_1660.png",
          "5",
          "1",
          "1800.0",
          "1.0",
          "3.0",
          "False"
      ]
  ],
  [
      [
          "11",
          "Kingston NV1 500 GB M.2 2280 PCI-E x4 Gen3 NVMe",
          "/static/shop/img/PRODUCTS/SSD_KINGSTON_NV1_NVME.jpg",
          "6",
          "1",
          "244.0",
          "1.0",
          "3.0",
          "False"
      ],
      [
          "12",
          "Crucial MX500 500 GB 2.5&quot; SATA III",
          "/static/shop/img/PRODUCTS/SSD_CRUCIAL_MX500_SATA.webp",
          "6",
          "1",
          "277.0",
          "1.0",
          "3.0",
          "False"
      ]
  ],
  [
      [
          ""
      ]
  ],
  [
      [
          ""
      ]
  ],
  [
      [
          ""
      ]
  ],
  [
      [
          ""
      ]
  ],
  [
      [
          "13",
          "HP Pavilion Gaming TG01",
          "/static/shop/img/PRODUCTS/PC_HP_PAVILION_GAMING_TG01.webp",
          "11",
          "2",
          "4799.0",
          "1.0",
          "3.0",
          "False"
      ],
      [
          "14",
          "Game X G500",
          "/static/shop/img/PRODUCTS/PC_ASUS_GAMEX.webp",
          "11",
          "2",
          "6000.0",
          "1.0",
          "3.0",
          "False"
      ]
  ],
  [
      [
          ""
      ]
  ],
  [
      [
          "15",
          "Samsung Odyssey G3A",
          "/static/shop/img/PRODUCTS/MONITOR_ODDYSEY_G3.jpg",
          "13",
          "1",
          "940.0",
          "1.0",
          "3.0",
          "False"
      ],
      [
          "16",
          "Asus VZ24EHE",
          "/static/shop/img/PRODUCTS/MONITOR_ASUS_VZ24EHE.jpg",
          "13",
          "1",
          "690.0",
          "1.0",
          "3.0",
          "False"
      ]
  ],
  [
      [
          ""
      ]
  ],
  [
      [
          ""
      ]
  ],
  [
      [
          ""
      ]
  ],
  [
      [
          ""
      ]
  ],
  [
      [
          ""
      ]
  ],
  [
      [
          ""
      ]
  ],
  [
      [
          ""
      ]
  ]
]
const testImg = [
  
]
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
export { AfterLoad, renderTry, productsTest };
