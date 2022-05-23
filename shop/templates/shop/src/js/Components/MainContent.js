import Carousel from "./Carousel";
import image1 from "../../images/undraw_dev_productivity_re_fylf.svg";
import { hotshotTest } from "./Test";
import { Hotshot } from "./Hotshot";
const MainContent = () => {
  return (
    <article className="container-fluid main py-5 bg-dark text-white  animate__animated animate__backInRight">
      <section className="main-content">
        <Carousel />
        <Hotshot info={hotshot} />
      </section>
      <section className="item-bar-holder">
        <div className="item-bar">
          <div className="item">
            <img src={image1} alt="item" />
            <p>Product nameeeee</p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default MainContent;
