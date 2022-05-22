import image1 from "../../images/undraw_dev_productivity_re_fylf.svg";
const Hotshot = (props) => {
  const img = props.img;
  return (
    <>
      <div className="card d-flex flex-column">
        <div className="card-baner">
          <p className="mt-2">HOTSHOT</p>
        </div>
        <img src={image1} className="card-img" alt="promotion" />
        <div className="card-prices">
          <span className="text-smaller">466 PLN</span>
          <span className="text-bigger"> 465 PLN</span>
        </div>
        <p className="product-name">Product name</p>
        <button className="btn card-button">ADD TO CART</button>
      </div>
    </>
  );
};

export { Hotshot };
