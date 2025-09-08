import { DeliveryOption } from "./DeliveryOptions";
import { CartItemDetails } from "./CartItemDetails";
import { DeliveryDate } from "./DeliveryDate";
export function OrderSummary( { cart , delivery}) {
  return (
    <div className="order-summary">
      {delivery.length > 0 && cart.map((cartItem) => {
            const selectedDeliveyOption =
          delivery.find((eachDelivery) => {
            return eachDelivery.id === cartItem.deliveryOptionId;
          })
        return (
          <div key={cartItem.productId} className="cart-item-container">

            <DeliveryDate selectedDeliveyOption={selectedDeliveyOption}  delivery={delivery} cartItem={cartItem} />

            <div className="cart-item-details-grid">
              

              <CartItemDetails cartItem={ cartItem } />

              <DeliveryOption  delivery={delivery} cartItem={cartItem}/>
            </div>
          </div>
        )
      })}

    </div>
  );
}