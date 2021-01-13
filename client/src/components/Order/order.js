import CheckoutProgress from '../checkoutProgress/checkoutProgress'
 const Order = (props) => {
     return ( 
         <div className="order">
              <CheckoutProgress step={3}/>
         </div>
      );
 }
  
 export default Order;