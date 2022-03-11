import react from "react";
const MainNav = () => {
  return (
    <nav className="w-100 bg-danger d-flex flex-wrap justify-content-between gap-3 p-2">
      <div className="row w-100 gap-3">
        <div className="col">
          <img src="#" alt="logo" className="img-fluid" />
        </div>

        <div className="col min-rem">
          <form className="form d-flex ">
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

        <div className="col">
          <div className="d-flex gap-3 justify-content-end">
            <button className="btn text-white bg-dark">Shopping cart</button>
            <button className="btn text-white bg-dark">Login</button>
            <button className="btn text-white bg-dark">3</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
