import dayjs from "dayjs";
import { formatMoney } from "../../utils/money";
export function DeliveryOption({ delivery, cartItem }) {
  return (
    <div className="delivery-options">
      <div className="delivery-options-title">
        Choose a delivery option:
      </div>
      {delivery.map((eachDelivery) => {
        let priceString = 'Free Shipping';
        if (eachDelivery.priceSrting > 0) {
          priceString =
            `${formatMoney(eachDelivery.priceCents)} - Shipping`
        }
        return (
          <div key={eachDelivery.id} className="delivery-option">
            <input type="radio"
              checked={eachDelivery.id ===
                cartItem.deliveryOptionId}
              className="delivery-option-input"
              name={`delivery-option-${cartItem.productId}`} />
            <div>
              <div className="delivery-option-date">
                {dayjs(eachDelivery.estimatedDeliveryTimeMs).format('dddd, MMMM  D')}
              </div>
              <div className="delivery-option-price">
                {priceString}
              </div>
            </div>
          </div>
        );
      })}


    </div>
  );
}