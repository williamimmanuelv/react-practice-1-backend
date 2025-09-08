import dayjs from "dayjs";

export function DeliveryDate( selectedDeliveyOption ) {

    return(
        <div className="delivery-date">
              Delivery date:
              {dayjs(selectedDeliveyOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')};
        </div>
    );
}