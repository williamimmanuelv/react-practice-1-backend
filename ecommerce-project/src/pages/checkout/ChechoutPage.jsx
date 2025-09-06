import './CheckoutPage.css';
import axios from 'axios';
import { CheckoutHeader } from './CheckoutHeader';
import { useEffect, useState } from 'react';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';
export function CheckoutPage({ cart }) {
  const [delivery, setDelivery] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  useEffect(() => {
    const deliveryData = async() => {
      let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')

        setDelivery(response.data)

        response = await axios.get('/api/payment-summary')

        setPaymentSummary(response.data)
    }
    deliveryData();

  }, [])
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <title>Checkout</title>
      <CheckoutHeader />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">

          <OrderSummary cart={cart} delivery={delivery} />

          <PaymentSummary paymentSummary={paymentSummary} />

        </div>
      </div>
    </>
  )
}