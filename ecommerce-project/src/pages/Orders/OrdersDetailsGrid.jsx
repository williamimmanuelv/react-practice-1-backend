import dayjs from "dayjs";
import { Fragment } from "react";
import { Link } from "react-router";

export function OrderDetailsGrid( { order } ) {

  
    return(
        <div className="order-details-grid">

              {order.products.map((orderProducts) => {
                return (
                  <Fragment key={orderProducts.product.id}>
                    <div className="product-image-container">
                      <img src={orderProducts.product.image} />
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
                      <Link to={`/tracking/${order.id}/${orderProducts.product.id}`}>
                        <button className="track-package-button button-secondary">
                          Track package
                        </button>
                      </Link>
                    </div>
                  </Fragment>
                )
              })}


            </div>
    );
}