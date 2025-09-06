import axios from 'axios';
import { Header } from '../../components/Header';
import './OrdersPage.css'
import { Fragment, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { formatMoney } from '../../utils/money';
export function OrdersPage({ cart }) {
  const [ orders, setOrders ] = useState([]);
  useEffect(() => {
    axios.get('/api/orders?expand=products')
      .then((response) => {
        setOrders(response.data)
      })
  }, [])
  return (
    <>

      <title>Orders</title>

      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <div className="orders-grid">
          {orders.map((order) => {
            return (
              <div key={order.id} className="order-container">

                <div className="order-header">
                  <div className="order-header-left-section">
                    <div className="order-date">
                      <div className="order-header-label">Order Placed:</div>
                      <div>{dayjs(order.orderTimeMs).format('MMMM D')}</div>
                    </div>
                    <div className="order-total">
                      <div className="order-header-label">Total:</div>
                      <div>{formatMoney(order.totalCostCents)}</div>
                    </div>
                  </div>

                  <div className="order-header-right-section">
                    <div className="order-header-label">Order ID:</div>
                    <div>{order.id}</div>
                  </div>
                </div>

                <div className="order-details-grid">

                  {order.products.map((orderProducts) => {
                    return(
                    <Fragment key={orderProducts.product.id}>
                      <div className="product-image-container">
                        <img src={orderProducts.product.image}/>
                      </div>

                      <div className="product-details">
                        <div className="product-name">
                          {orderProducts.product.name}
                        </div>
                        <div className="product-delivery-date">
                          {dayjs(orderProducts.estimatedDeliveryTimeMs).format('MMMM D')}
                        </div>
                        <div className="product-quantity">
                          {orderProducts.quantity}
                        </div>
                        <button className="buy-again-button button-primary">
                          <img className="buy-again-icon" src="images/icons/buy-again.png" />
                          <span className="buy-again-message">Add to Cart</span>
                        </button>
                      </div>

                      <div className="product-actions">
                        <a href="/tracking">
                          <button className="track-package-button button-secondary">
                            Track package
                          </button>
                        </a>
                      </div>
                    </Fragment>
                    )
                  })}


                </div>
              </div>

            );
          })}


        </div>
      </div>
    </>
  )
}