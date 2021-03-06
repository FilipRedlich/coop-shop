import React from "react";
import  {
  imgArr,
} from "./Test";
import { addEvent } from "./ProductsNav";
import { render } from "react-dom";

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

const renderRoot = (
  renderElement,
  renderPlace = document.querySelector("#root")
) => {
  render(renderElement, renderPlace);
};

const renderInSubRoot = (el, options) => {
  return (
    <div id="subRoot" className={options}>
      {el}
    </div>
  );
};

const RenderOnLoad = () => {
  //renderTry(SUBCATS_NAME[1], SUBCATS_IMG[0]);
  render(
    <RenderSubcat el={subcatNamesTest[1]} img={subcatImages[3]} />,
    document.querySelector("#rootSubcategories")
  );
  //Due to some issues with rendering time
  //There needs to be timeout to create a delay between renders
  setTimeout(() => {
    addEvent(); //It needs to be initiated on load to add EventListener to buttons
  }, 200);

  console.log("RenderOnLoad in RenderScripts");
  return <></>;
};
//Creates subcategories (Primarily used in RenderFromCat (It's added with onClick event))
const RenderSubcat = (props) => {
  const el = props.el;
  const img = props.img;

  return el.map((val, i) => {
    const convImg = img[i];
    console.log(convImg, "convImg");
    return (
      <>
        <button
          type="button"
          className="subcategory testing"
          onClick={() => {
            addEvent();
          }}
        >
          <img src={convImg} alt={val + " Quick debug on dev"} loading="lazy" />
          <p>{val || "Default text"}</p>
        </button>
      </>
    );
  });
};
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

//Adds functionality to category buttons
const RenderFromCat = (ARRAY = []) => {
  const categories = document.querySelectorAll(".categories-button");
  setTimeout(() => {
    for (let i = 0; i < ARRAY.length; i++) {
      categories[i].addEventListener("click", () => {
        //adds function to specified category
        switch (ARRAY[i]) {
          //remove comments for renderTry function when switching from/to prod (ARRAY_x_SUBCATEGORY should be on prod!)
          //After recent changes (25.04.2022) ARRAY_x_SUBCATEGORY is now changed to multidimensional array 'SUBCATS_x'
          //x now defines it's type - name, picture etc.
          case `${ARRAY[0]}`:
            // render(
            //   <RenderSubcat el={SUBCATS_NAME[1]} img={SUBCATS_IMG[3]} />,
            //   document.querySelector("#rootSubcategories")
            //     );
            render(
              <RenderSubcat el={subcatNamesTest[1]} img={subcatImages[3]} />,
              document.querySelector("#rootSubcategories")
            );
            addEvent();

            break;
          case `${ARRAY[1]}`:
            // render(
            //   <RenderSubcat el={SUBCATS_NAME[2]} img={SUBCATS_IMG1[0]} />,
            //   document.querySelector("#rootSubcategories")
            // );
            // render(
            //   <RenderSubcat el={SUBCATS_NAME[2]} img={SUBCATS_IMG[4]} />,
            //   document.querySelector("#rootSubcategories")
            // );
            render(
              <RenderSubcat el={subcatNamesTest[2]} img={subcatImages[4]} />,
              document.querySelector("#rootSubcategories")
            );

            addEvent();

            break;
        }
      });
    }
  }, 200);
};

export {renderRoot, renderInSubRoot, RenderOnLoad, RenderFromCat};
