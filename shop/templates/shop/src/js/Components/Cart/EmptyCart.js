const EmptyCart = () => {
    return (
      <div className="cart-item text-center p-2 w-100 bg-dark rounded m-auto">
        <div className="lead p-3">
          <h3>We didn't find any items in your cart!</h3>
          <p>
            Return to
            <span
              className="text-danger back-btn px-2"
              onClick={() => {
                renderRoot(<MainContent />);
              }}
            >
              homepage
            </span>
            to continue shopping
          </p>
        </div>
      </div>
    );
}
export default EmptyCart;