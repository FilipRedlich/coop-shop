import ChangeQuantityForm from "./ChangeQuantity";
import DeleteProductForm from "./DeleteProduct";
import PricesOfProducts from "./PricesOfProducts";

const ProductInCart = (props) => {
  const items = props.items;
  return items.map((x, i) => {
    //if the price is lower than regular price, assign to variable regular price (It's used to show old price, before applying discount)

    if (x[5] * x[6] < x[5]) {
      var prevPrice = `${x[5]}$`; //Price before discount
    } else {
      console.log("price is the same");
    }

    return (
      <form className="cart-item d-flex gap-3 flex-row flex-wrap justify-content-between p-2 w-100 rounded m-auto">
        <input type="hidden" name="csrfmiddlewaretoken" value={CSRF_TOKEN} />
        <div className="d-flex flexb-50 gap-3 flex-row flex-wrap">
          <img src={x[2]} className="cart-img" alt={x[1]} loading="lazy" />
          <h4 className="my-auto item-name">{x[1]}</h4>
        </div>
        <div className="d-flex flexb-50 flex-row gap-3  text-center ml-auto justify-content-center position-relative">
          <ChangeQuantityForm items={x} />
          <PricesOfProducts items={x} previousPrice={prevPrice} />
          <DeleteProductForm items={x} />
        </div>
      </form>
    );
  });
};

export default ProductInCart;
