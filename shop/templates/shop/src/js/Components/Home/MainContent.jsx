import Carousel from "./Carousel";
import { ItemBar } from "./Itembar";
import { Hotshot } from "./Hotshot";
import { hotshotTest, basketProductsTest } from "../utility/Test";
const MainContent = () => {
  return (
    <article className="main animate__animated animate__backInRight">
      <section className="main-content">
        <Carousel />
        <Hotshot info={hotshot} />
      </section>
      <ItemBar />
    </article>
  );
};

export { MainContent };
