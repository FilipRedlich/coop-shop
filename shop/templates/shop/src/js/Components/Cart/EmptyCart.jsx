import { renderRoot } from "../utility/RenderScripts";
import { MainContent } from '../Home/MainContent';
import { Link } from "react-router-dom";
const EmptyCart = () => {
  return (
    <div className="empty-cart ">
      <div className="empty--cart-container">
        <h3 className="empty---cart--container-error">We didn't find any items in your cart!</h3>
        
        <p className="empty---cart--container-return">
          Return to 
          <Link
            className="empty----cart---container--return-backBtn text-danger back-btn px-2"
            to={'*'}
          >
            Homepage
          </Link>
           to continue shopping
        </p>
        <p className="empty---cart--container-reminder">Please remember to login in order to add items to your cart</p>
      </div>
    </div>
  );
}
export default EmptyCart;