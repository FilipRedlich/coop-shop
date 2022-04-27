import Carousel from "./Carousel";
import image1 from "../../images/undraw_dev_productivity_re_fylf.svg";
const MainContent = () => {
  return (
    <article className="container-fluid main py-5 bg-dark text-white  animate__animated animate__bounceIn">
      <section className="main-content">
        <Carousel />
        <div className="card d-flex flex-column">
          <div className="card-baner bg-danger">
            <p>HOTSHOT</p>
          </div>
          <img src={image1} className="card-img" alt="promotion" />
          <div className="card-prices">
            <span className="text-smaller">466 PLN</span>
            <span className="text-bigger"> 466 PLN</span>
          </div>
          <p className="product-name">Product name</p>
          <button className="btn card-button">ADD TO CART</button>
        </div>
      </section>
      <section className="item-bar-holder">
        <div className="item-bar">
          <div class="item">
            <img src={image1} alt="item" />
            <p>Product nameeeee</p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default MainContent;
