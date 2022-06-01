const CreateOptions = (props) => {
  const howMany = props.howMany; //[4] is stock, [9] in cart
  const ss = howMany[4];
  //console.log(howMany);
  let inCart = parseInt(howMany[9]);
  let inStock = parseInt(howMany[4]);
  console.log(inCart, 'createOptions');
  //console.log(inStock)
  return [...Array(inStock)].map((elementInArray, index) => (
    <option className="quantity-option" key={index}>
      {index + 1}
    </option>
  ));
};

export default CreateOptions;