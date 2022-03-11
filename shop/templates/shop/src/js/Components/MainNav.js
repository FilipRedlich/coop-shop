import react from "react";
const MainNav = () => {
  return (
    <nav className="w-100 bg-black d-flex flex-wrap justify-content-between gap-3 p-2">
      <div className="row m-auto w-100 gap-3">
        <div className="col m-auto">
          <h1 className="text-white text-center">Pestka</h1>
          {/* <img src="#" alt="logo" className="img-fluid" /> */}
        </div>

        <div className="col min-rem m-auto">
          <form className="form d-flex">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn bg-dark text-white" type="submit">
              Search
            </button>
          </form>
        </div>

        <div className="col m-auto">
          <div className="d-flex gap-3 justify-content-end">
            <button className="btn text-white bg-dark">Shopping cart</button>
            <button className="btn text-white bg-dark">Login</button>
            <button className="btn text-white bg-dark">Register</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
