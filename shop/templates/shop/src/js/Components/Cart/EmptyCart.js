import { renderRoot } from "../utility/RenderScripts";
import { MainContent } from '../Home/MainContent';
const EmptyCart = () => {
  return (
    <div className="empty-cart ">
      <div className="empty--cart-container">
        <h3 className="empty---cart--container-error">We didn't find any items in your cart!</h3>
        
        <p className="empty---cart--container-return">
          Return to 
          <span
            className="empty----cart---container--return-backBtn text-danger back-btn px-2"
            onClick={() => {
              renderRoot(<MainContent />);
            }}
          >
            Homepage
          </span>
           to continue shopping
        </p>
        <p className="empty---cart--container-reminder">Please remember to login in order to add items to your cart</p>
      </div>
    </div>
  );
}
export default EmptyCart;