const ProductNav = () => {
  return (
    <nav className="bg-danger w-100 d-flex flex-wrap justify-content-center m-auto p-3 gap-3 nav-products">
      <button className="btn btn-lg bg-transparent  text-white">
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
  );
};

export default ProductNav;