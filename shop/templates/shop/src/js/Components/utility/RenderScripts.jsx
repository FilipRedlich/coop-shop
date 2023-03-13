import React from "react";
import { catNamesTest, imgArr } from "./Test";
import { addEvent } from "../Nav/ProductsNav";
import { render } from "react-dom";
import { Link } from "react-router-dom";
//Start of variables for testing (Due to weird parcel bugs)
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
const subcatImagesTest = [imgArr];
const TEST_PRODUCT1 = [
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
//end of variables


//Renders initial subcategories and adds event to them

//Creates subcategories (Primarily used in RenderFromCat (It's added with onClick event))
const RenderSubcat = ({ el = [], img = [], startIndex }) => {
  if (el.length === 0 || img.length === 0) {
    return null;
  }

  return el.map((val, i) => {
    const convImg = img[i];
    i++;
    if(startIndex > 0 && startIndex !== undefined){
      i += startIndex;
    }
    
    console.log(convImg, "convImg");
    
    return (
      <Link key={val} to={`/products/${i}`}>
        <button
          type="button"
          className="subcategory testing"
          onClick={addEvent}
        >
          id: {i}
          <img src={convImg} alt={`${val} Quick debug on dev`} loading="lazy" />
          <p>{val || "Default text"}</p>
        </button>
      </Link>
    
    );
  });
};



export {  RenderSubcat };
