import images from "./Images";
const Cart = () => {
    return (
      <>
        <section
          id="cart"
          className="cart text-white d-flex flex-row flex-wrap gap-2 p-2 animate__animated animate__bounceIn"
        >
          <div class="cart-items d-flex flex-column flex-wrap  flexb-70 m-auto gap-3 p-3 bg-transparent-custom rounded">
            <div className="cart-item d-flex flex-row flex-wrap justify-content-center w-100 bg-dark rounded m-auto">
              <div className="d-flex flexb-70 gap-3 flex-row flex-wrap justify-content-center">
                <img src={images[0].src} className="cart-img" />
                <h2 className="my-auto">Item Name</h2>
              </div>
              <div className="d-flex flexb-30 flex-row gap-3  text-center ml-auto justify-content-center position-relative">
                <h4 className="my-auto item-price">{`1222$`}</h4>
                <button className=" btn text-white bg-danger remove-item my-auto">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <div className="cart-item d-flex flex-row flex-wrap justify-content-center w-100 bg-dark rounded m-auto">
              <div className="d-flex flexb-70 gap-3 flex-row flex-wrap justify-content-center">
                <img src={images[0].src} className="cart-img" />
                <h2 className="my-auto">Item Name</h2>
              </div>
              <div className="d-flex flexb-30 flex-row gap-3  text-center ml-auto justify-content-center position-relative">
                <h4 className="my-auto item-price">{`1222$`}</h4>
                <button className=" btn text-white bg-danger remove-item my-auto">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
            <div className="cart-item d-flex flex-row flex-wrap justify-content-center w-100 bg-dark rounded m-auto">
              <div className="d-flex flexb-70 gap-3 flex-row flex-wrap justify-content-center">
                <img src={images[0].src} className="cart-img" />
                <h2 className="my-auto">Item Name</h2>
              </div>
              <div className="d-flex flexb-30 flex-row gap-3  text-center ml-auto justify-content-center position-relative">
                <h4 className="my-auto item-price">{`1222$`}</h4>
                <button className=" btn text-white bg-danger remove-item my-auto">
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="checkout m-auto bg-transparent-custom rounded">
            <form className="checkout-form d-flex flex-column justify-content-around p-3 ">
              <div class="flexb-70">
                <label className="text-muted">Subtotal:</label>
                <h5>{`12222$`}</h5>
                <p className="text-muted">{`+ Delivery`}</p>
              </div>
              <input
                className="checkout-submit flexb-30 btn btn-lg bg-danger text-white "
                type="submit"
                value="Checkout"
              />
            </form>
          </div>
        </section>
      </>
    );
}

export default Cart;