const CreateOptions = (props) => {
  const howMany = props.howMany; //[4] is stock, [9] in cart
  //console.log(howMany);
  let inCart = parseInt(howMany[9]);
  let inStock = parseInt(howMany[4]);
  console.log(inCart, 'createOptions');

  return [...Array(inStock)].map((elementInArray, index) => (
    <option className="quantity-option" key={index}>
      {index + 1}
    </option>
  ));
};

export {CreateOptions};