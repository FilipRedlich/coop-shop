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
    <form className="checkout-form d-flex flex-column justify-content-around p-3 ">
      <div className="flexb-70">
        <label className="text-muted">Subtotal:</label>
        <h5>{<TotalPrice price={basketProducts} />}</h5>
        <p className="text-muted">{`+ Delivery`}</p>
      </div>
      <input
        className="checkout-submit flexb-30 btn btn-lg text-dark "
        type="submit"
        value="Checkout"
      />
    </form>
  );
};
export default CheckOut;