import { useState } from "react";


const ProductNav = () => {
    const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
      setActive(!isActive);
    };


  return (
    <>
      <nav className="product-nav bg-transparent-custom position-sticky top-0 w-100 d-flex flex-wrap justify-content-center m-auto p-3 gap-3 nav-products">
        <button
          className="btn btn-lg bg-transparent  text-white"
          onClick={ToggleClass}
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

      <section
        id="categories"
        className={
          isActive
            ? "hide-element position-fixed  p-3 mx-auto"
            : "position-fixed rounded top-25 text-white w-75 translate-middle-x start-50 bg-transparent-custom blur-bg p-3 mx-auto transition-5 min-h-rem"
        }
      >
        <h1 className="text-center">Categories</h1>
        <div className="d-flex flex-wrap flex-row w-100">
          <div className="text-left d-flex flex-column w-25 gap-1">
            <button className="btn text-white w-50 bg-dark ">Podzespoły komputerowe</button>
            <button className="btn text-white w-50 bg-dark ">Podzespoły komputerowe</button>
            <button className="btn text-white w-50 bg-dark ">Podzespoły komputerowe</button>
            <button className="btn text-white w-50 bg-dark ">Podzespoły komputerowe</button>
            <button className="btn text-white w-50 bg-dark ">Podzespoły komputerowe</button>
            <button className="btn text-white w-50 bg-dark ">Podzespoły komputerowe</button>
            <button className="btn text-white w-50 bg-dark ">Podzespoły komputerowe</button>
            <button className="btn text-white w-50 bg-dark ">Podzespoły komputerowe</button>
          </div>
          <div className="bg-dark w-75 d-flex">
            <ul>
              <li>dsds</li>
              <li>dsds</li>
              <li>dsds</li>
            </ul>
            <ul>
              <li>dsdsd</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductNav;
