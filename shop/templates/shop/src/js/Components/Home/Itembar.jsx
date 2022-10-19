import { useState } from "react";
import image1 from "../../../images/undraw_dev_productivity_re_fylf.svg";
import { basketProductsTest, productsTest } from '../utility/Test';
const CreateItems = (props) => {
  //const [filteredItems, setFilteredItems] = useState([]);
  let itemsToFilter = props.itemsInBar;
  const filteredItems = []
  // let change = itemsToFilter.filter((e, i) => {
  //   if (e.length === 1) {
  //     console.log('item is empty, itemsInBar', e);
  //     return null
  //   } else {
  //     return [...e];
  //   }

  // });
  //console.log(itemsToFilter);

  for (i in itemsToFilter) {
    for (y in itemsToFilter[i]) {
      //console.log((itemsToFilter[i][y].length === 1), 'test')
      if (itemsToFilter[i][y].length > 1) {
        filteredItems.push(itemsToFilter[i][y]);
      }
    }
  }
  //console.log(filteredItems)

  return filteredItems.map((x, i) => {
    return (
      <>
        <div className="item">
          <img src={x[2]} alt={x[1]} />
          <p>{x[1]}</p>
        </div>
      </>
    );
  });
};

const ItemBar = (props) => {
  return (
    <>
      <section className="item-bar-holder">
        <div className="item-bar">
          <CreateItems itemsInBar={products} />
        </div>
      </section>
    </>
  );
};
export { ItemBar };
