import { Link, useParams } from "react-router";
import { Header } from "../../components/Header";
import './TrackingPage.css'
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export function TrackingPage({ cart }) {
  const params = useParams();
  const { orderId, productId } = params;
  const [orders, setOrders] = useState(null)
  
  useEffect(() => {
    const getTrackingData = async () => {
      const response = await axios.get(`/api/orders/${orderId}?expand=products`);
      setOrders(response.data)
      console.log(response.data);
    };
    getTrackingData();
  }, [orderId])

  if (!orders) {
    return null
  }

  console.log(orders);

  console.log('produ' + productId);

  const orderProduct = orders.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  // progress bar
  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - orders.orderTimeMs;
  const timePassesMs = dayjs().valueOf() - orders.orderTimeMs;
  let deliveryPercent = (timePassesMs / totalDeliveryTimeMs) * 100

  if (deliveryPercent > 100) {
    deliveryPercent = 100;
  }


  // delivery label

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >=33 ;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <title> tracking </title>
      <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />

      <Header cart={cart} />
      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">
            {deliveryPercent >= 100 ? 'Delivered on ' : 'Arriving on'} {dayjs(orderProduct.estimatedDeliveryTimeMs).format('MMMM DD')}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">
            Quantity: {orderProduct.quantity}
          </div>

          <img className="product-image" src={orderProduct.product.image} />

          <div className="progress-labels-container">
            <div className={` progress-label ${isPreparing && 'current-status'}`}>
              Preparing
            </div>
            <div className={` progress-label ${isShipped && 'current-status'}`}>
              Shipped
            </div>
            <div className={` progress-label ${isDelivered && 'current-status'}`}>
              Delivered
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: ` ${deliveryPercent} %` }}></div>
          </div>
        </div>
      </div>
    </>
  )
}