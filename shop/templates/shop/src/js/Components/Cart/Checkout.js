import { basketProductsTest } from "../utility/Test";

const TotalPrice = (props) => {
  const CurrentPrice = props.price;
  var convertedPrice = 0; //Converted price to integer

  CurrentPrice.map((x) => {
    convertedPrice += parseInt((x[5] * x[6]) * x[9]);
  });

  if (isNaN(convertedPrice)) {
    return 0 + "$";
  } else {
    return convertedPrice + "$";
  }
};

const CheckOut = () => {
  return (
    <form className="checkout-form">
      <div>
        <label>Subtotal:</label>
        <h5>{<TotalPrice price={basketProducts} />}</h5>
        <p>{`+ Delivery`}</p>
      </div>
      <button
        className="checkout-submit"
        type="submit"
        value="Checkout"
        disabled
      >Checkout</button>
    </form>
  );
};
export default CheckOut;