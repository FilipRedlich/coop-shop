const PricesOfProducts = (props) => {
    const items = props.items;
    const prevPrice = props.previousPrice;
    console.log(prevPrice, 'PrevPrice')
    return (
      <div className="d-flex flex-column justify-content-center">
        <p className="item-prevPrice">{prevPrice}</p>
        <h5 className="text-purple">{`${items[5] * items[6]}$`}</h5>
        <h6 className="text-muted">{`In stock: ${items[4]}`}</h6>
      </div>
    );
}
export default PricesOfProducts;