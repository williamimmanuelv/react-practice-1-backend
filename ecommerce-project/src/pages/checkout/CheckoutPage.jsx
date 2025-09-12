import './CheckoutPage.css';
import axios from 'axios';
import { CheckoutHeader } from './CheckoutHeader';
import { useEffect, useState } from 'react';
import { OrderSummary } from './OrderSummary';
import { PaymentSummary } from './PaymentSummary';

export function CheckoutPage({ cart, loadCart }) {
  const [deliveryOptions, setDeliveryOption] = useState([]);
  const [paymentSummary, setPaymentSummary] = useState(null);
  
  useEffect(() => {
    const deliveryData = async() => {
      let response = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime')

        setDeliveryOption(response.data)

        response = await axios.get('/api/payment-summary')

        setPaymentSummary(response.data);
        
    }
    deliveryData();

  }, [ cart ])
  
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
      <title>Checkout</title>
      <CheckoutHeader cart ={ cart } />
      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">

          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} loadCart={loadCart} />

          <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>

        </div>
      </div>
    </>
  )
}