import { render } from "react-dom";
import images from "./Images";
import { cartContentsTest } from "./Test";
const TotalPrice = (props) => {
  const CurrentPrice = props.price;
  var convertedPrice = 0; //Converted price to integer

   CurrentPrice.map((x) => {
    convertedPrice += parseInt(x[5]);
   })
  
  return convertedPrice + '$';
}
const HowManyItems = (props) => {
  const items = props.el;

  return items.map((x) => {
    return (
      <div className="cart-item d-flex gap-3 flex-row flex-wrap justify-content-between p-2 w-100 bg-dark rounded m-auto">
        <div className="d-flex flexb-50 gap-3 flex-row flex-wrap">
          <img src={x[2]} className="cart-img" />
          <h4 className="my-auto item-name">{x[1]}</h4>
        </div>
        <div className="d-flex flexb-50 flex-row gap-3  text-center ml-auto justify-content-center position-relative">
          <div class="d-flex flex-column justify-content-center">
            <h5 className="">{`${x[5]}$`}</h5>
            <h6>{`In stock: ${x[4]}`}</h6>
          </div>
          <button className=" btn text-white bg-danger remove-item my-auto">
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </div>
    );
  })
}
const Cart = () => {
    return (
      <>
        <section
          id="cart"
          className="cart text-white d-flex flex-row flex-wrap gap-2 p-2 animate__animated animate__bounceIn"
        >
          <div id="card-items" className="cart-items d-flex flex-column flex-wrap  flexb-70 m-auto gap-3 p-3 bg-transparent-custom rounded">
           
           <HowManyItems el={cartContentsTest} /> {/* cardContentsTest or CardContents*/}
  
          </div>
          <div className="checkout m-auto bg-transparent-custom rounded">
            <form className="checkout-form d-flex flex-column justify-content-around p-3 ">
              <div class="flexb-70">
                <label className="text-muted">Subtotal:</label>
                <h5>{<TotalPrice price={cartContentsTest} />}</h5>
                <p className="text-muted">{`+ Delivery`}</p>
              </div>
              <input
                className="checkout-submit flexb-30 btn btn-lg bg-danger text-white "
                type="submit"
                value="Checkout"
              />
            </form>
          </div>
        </section>
      </>
    );
}
export { HowManyItems };
export default Cart;