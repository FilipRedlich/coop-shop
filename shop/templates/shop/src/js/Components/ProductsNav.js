import Categories from "./Categories";
import { useState } from "react";
const ProductNav = () => {
  const [isActive, setActive] = useState(false);

  const toggleElement = () => {
    setActive(!isActive);
    console.log("worked");
  };
  return (
    <>
      <nav className="product-nav bg-transparent-custom position-sticky top-0 w-100 d-flex flex-wrap justify-content-center m-auto p-3 gap-3 nav-products">
        <button
          className="btn btn-lg bg-transparent  text-white"
          onClick={toggleElement}
        >
          Categories
        </button>
        <button className="btn btn-lg bg-transparent  text-white">
          On sale
        </button>
        <button className="btn btn-lg bg-transparent  text-white">
          Outlet
        </button>
        <button className="btn btn-lg bg-transparent  text-white">
          Services
        </button>
        <button className="btn btn-lg bg-transparent  text-white">
          Newsletter
        </button>
      </nav>
      <Categories />
    </>
  );
};

export default ProductNav;
