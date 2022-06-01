const TotalPrice = (props) => {
  const CurrentPrice = props.price;
  var convertedPrice = 0; //Converted price to integer

  CurrentPrice.map((x) => {
    convertedPrice += parseInt(x[5] * x[6]);
  });

  if (isNaN(convertedPrice)) {
    return 0 + "$";
  } else {
    return convertedPrice + "$";
  }
};

export { TotalPrice };