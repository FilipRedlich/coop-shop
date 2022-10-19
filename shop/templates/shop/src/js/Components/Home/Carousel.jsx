import image1 from "../../../images/undraw_dev_productivity_re_fylf.svg";
import image2 from "../../../images/undraw_software_engineer_re_fyew.svg";
import haloweenDeal from '../../../../../../static/shop/img/GALLERY/HALOWEEN_DEAL.png';
import more from '../../../../../../static/shop/img/GALLERY/MORE.png';
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { TEST_ARRAY } from "../utility/Test";
const images = [
    { id: 1, src: haloweenDeal},
    { id: 2, src: more },
    {} //DO NOT REMOVE (this element is needed for resetting carousel index)
];

const Carousel = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count == images.length - 1) {
      setCount(0);
    }
  });
  useInterval(() => {
    setCount(count + 1);
  }, 3000);

  return (
    <div
      className="card gallery"
    >
      <img
        src={images[count].src}
        alt="gallery"
        className="gallery-img "
      />
    </div>
  );
};
export { images };
export default Carousel;
