import Carousel from "./Carousel";
import { ItemBar } from "./Itembar";
import { Hotshot } from "./Hotshot";
import { hotshotTest, basketProductsTest } from "../Test";
const MainContent = () => {
  return (
    <article className="container-fluid main py-5 bg-dark text-white  animate__animated animate__backInRight">
      <section className="main-content">
        <Carousel />
        <Hotshot info={hotshotTest} />
      </section>
      <ItemBar />
    </article>
  );
};

export default MainContent;
