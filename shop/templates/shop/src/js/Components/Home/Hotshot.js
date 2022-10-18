const Hotshot = (props) => {
  const info = props.info;
  console.log(info, 'myprtop')
  return (
    <>
      <form
        action="/addProductToBasket/"
        method="POST"
        className="card"
      >
        <input type="hidden" name="csrfmiddlewaretoken" value={CSRF_TOKEN} />
        <input type="hidden" name="id" value={info[0]} />
        <div className="card-baner">
          <p className="">HOTSHOT</p>
        </div>
        <img src={info[2]} className="card-img" alt={info[1]} />
        <div className="card-prices">
          <span className="text-smaller">{`${info[5]}$`}</span>
          <span className="text-bigger"> {`${info[5] * info[6]}$`}</span>
        </div>
        <p className="product-name">{info[1]}</p>
        <button type="submit" className="card-button">
          ADD TO CART
        </button>
      </form>
    </>
  );
};

export { Hotshot };
