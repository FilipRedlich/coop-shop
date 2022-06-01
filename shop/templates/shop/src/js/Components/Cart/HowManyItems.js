import EmptyCart from "./EmptyCart";
import CreateOptions from "./CreateOptions";
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
    return (
      <EmptyCart />
    );
  } else {
    console.log("there are items in cart");
    return items.map((x, i) => {
      //if the price is lower than regular price, assign to variable regular price (It's used to show old price, before applying discount)
      if (x[5] * x[6] < x[5]) {
        var prevPrice = `${x[5]}$`; //Price before discount
      } else {
        console.log("price is the same");
      }
      return (
        <div className="cart-item d-flex gap-3 flex-row flex-wrap justify-content-between p-2 w-100 rounded m-auto">
          <div className="d-flex flexb-50 gap-3 flex-row flex-wrap">
            <img src={x[2]} className="cart-img" alt={x[1]} loading="lazy" />
            <h4 className="my-auto item-name">{x[1]}</h4>
          </div>
          <div className="d-flex flexb-50 flex-row gap-3  text-center ml-auto justify-content-center position-relative">
            <form className="quantity-form">
              <select className="quantity-select">
                <CreateOptions howMany={x} />
              </select>
            </form>
            <div className="d-flex flex-column justify-content-center">
              <p className="item-prevPrice">{prevPrice}</p>
              <h5 className="text-purple">{`${x[5] * x[6]}$`}</h5>
              <h6 className="text-muted">{`In stock: ${x[4]}`}</h6>
            </div>
            <form
              className="my-auto"
              action="/deleteProductToBasket/"
              method="POST"
            >
              <input type="hidden" name="id" value={x[0]} />
              <input
                type="hidden"
                name="csrfmiddlewaretoken"
                value={CSRF_TOKEN}
              />
              <button type="submit" className="btn remove-item my-auto">
                <i className="bi bi-trash"></i>
              </button>
            </form>
          </div>
        </div>
      );
    });
  }
};
export default HowManyItems;