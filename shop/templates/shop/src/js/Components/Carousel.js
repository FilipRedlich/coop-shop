import image1 from "../../images/undraw_dev_productivity_re_fylf.svg";
import image2 from "../../images/undraw_software_engineer_re_fyew.svg";
import { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";
const images = [
    { id: 1, src: image1 },
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
    <div className="bg-black w-75 p-5 min-vh-100 m-auto gallery">
      <img
        src={images[count].src}
        alt="gallery"
        className="gallery-img d-block img-fluid"
      />
    </div>
  );
};

export default Carousel;
