import './CheckoutPage.css';
import axios from 'axios';
import dayjs from 'dayjs'
import { CheckoutHeader } from './CheckoutHeader';
import { formatMoney } from '../../utils/money';
import { useEffect, useState } from 'react';
export function CheckoutPage({ cart }) {
    const [delivery, setDelivery] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);
    useEffect(() => {
        axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
            .then((response) => {
                setDelivery(response.data)
                console.log(response.data);
            })

        axios.get('/api/payment-summary')
            .then((response) => {
                setPaymentSummary(response.data)
            })
    }, [])
    return (
        <>
            <link rel="icon" type="image/svg+xml" href="cart-favicon.png" />
            <title>Checkout</title>
            <CheckoutHeader />
            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {delivery.length > 0 && cart.map((cartItem) => {
                            const selectedDeliveyOption =
                                delivery.find((eachDelivery) => {
                                    return eachDelivery.id === cartItem.deliveryOptionId;
                                })
                            return (
                                <div key={cartItem.productId} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivery date:
                                        {dayjs(selectedDeliveyOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')};
                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={cartItem.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {cartItem.product.name}
                                            </div>
                                            <div className="product-price">
                                                {formatMoney(cartItem.product.priceCents)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <span className="delete-quantity-link link-primary">
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

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
                                    </div>
                                </div>
                            )
                        })}

                    </div>

                    <div className="payment-summary">
                        <div className="payment-summary-title">
                            Payment Summary
                        </div>
                        {paymentSummary && (
                            <>
                                <div className="payment-summary-row">
                                    <div>Items ({paymentSummary.tatalItems}):</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.productCostCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Shipping &amp; handling:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.shippingCostCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row subtotal-row">
                                    <div>Total before tax:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.totalCostBeforeTaxCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row">
                                    <div>Estimated tax (10%):</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.taxCents)}
                                    </div>
                                </div>

                                <div className="payment-summary-row total-row">
                                    <div>Order total:</div>
                                    <div className="payment-summary-money">
                                        {formatMoney(paymentSummary.totalCostCents)}
                                    </div>
                                </div>

                                <button className="place-order-button button-primary">
                                    Place your order
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}