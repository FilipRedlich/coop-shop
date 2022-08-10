import img1 from "../../../images/undraw_dev_productivity_re_fylf.svg";
import { discountItemsTest } from "../utility/Test";
const GetItemsOnDiscount = (props) => {
  const items = props.el;

  return items.map((x) => {
    //if the price is lower than regular price, assign to variable regular price (It's used to show old price, before applying discount)

    return (
      <>
        <form
          action="/addProductToBasket/"
          method="POST"
          className="card d-flex flex-column"
        >
          <input type="hidden" name="csrfmiddlewaretoken" value={CSRF_TOKEN} />
          <input type="hidden" name="id" value={x[0]} />
          <img src={x[2]} className="card-img" alt="promotion" />
          <div className="card-prices">
            <span className="text-smaller">{`${x[5]}$`}</span>
            <span className="text-bigger">{`${x[5] * x[6]}$`}</span>
          </div>
          <p className="product-name">{x[1]}</p>
          <button type="submit" className="btn card-button">
            Add to cart
          </button>
        </form>
      </>
    );
  });
};

const OnSale = () => {
  return (
    <>
       <section className="sale p-2 py-5 animate__animated animate__backInRight">
        <GetItemsOnDiscount el={discountItems} />
      </section>
    </>
  );
};

export default OnSale;
