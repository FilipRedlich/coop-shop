import EmptyCart from "./EmptyCart";
import ProductInCart from "./ProductInCart";

const HowManyItems = (props) => {
  const items = props.el;
  if (
    items.length === 0 ||
    items === undefined ||
    items === null ||
    items === NaN ||
    items[0][0] === ""
  ) {
    console.log("there are no items in cart");
    return <EmptyCart />;
  } else {
    console.log("there are items in cart");
    return <ProductInCart items={items} />;
  }
};
export default HowManyItems;
