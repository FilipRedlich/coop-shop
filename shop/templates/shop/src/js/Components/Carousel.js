import image1 from "../../images/undraw_dev_productivity_re_fylf.svg";
import image2 from "../../images/undraw_software_engineer_re_fyew.svg";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
import { TEST_ARRAY } from "./Test";
const images = [
    { id: 1, src: image1, testVal: TEST_ARRAY[0] },
    { id: 2, src: image2 },
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
      className="w-100 card gallery d-flex justify-content-center"
    >
      <img
        src={images[count].src}
        alt="gallery"
        className="gallery-img d-block "
      />
    </div>
  );
};
export { images };
export default Carousel;
