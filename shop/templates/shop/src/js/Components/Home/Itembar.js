import image1 from "../../../images/undraw_dev_productivity_re_fylf.svg";
import { basketProductsTest  } from '../utility/Test';
const CreateItems = (props) => {
   const itemsInBar = props.itemsInBar 
   return itemsInBar.map((x) => {
     return (
       <>
         <div className="item">
           <img src={image1} alt={x[1]} />
           <p>{x[1]}</p>
         </div>
       </>
     );
   });
};
const ItemBar = (props) => {
  return (
    <>
      <section className="item-bar-holder">
        <div className="item-bar">
          <CreateItems itemsInBar={basketProductsTest } />
        </div>
      </section>
    </>
  );
};
export { ItemBar };
