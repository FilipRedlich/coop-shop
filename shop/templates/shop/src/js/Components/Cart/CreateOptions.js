const CreateOptions = (props) => {
  const howMany = props.howMany; //[4] is stock, [9] in cart
  let inCart = parseInt(howMany[9]);
  let inStock = parseInt(howMany[4]);

  return [...Array(inStock)].map((elementInArray, index) => (
    <option className="quantity-option" name="quantity" value={index} key={index}>
      {index + 1}
    </option>
  ));
};

export default CreateOptions;