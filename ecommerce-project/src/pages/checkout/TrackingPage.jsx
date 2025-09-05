import { Link } from "react-router";
import { Header } from "../../components/Header";
import './TrackingPage.css'

export function TrackingPage(){
    return(
        <>
        <title> tracking </title>
        <link rel="icon" type="image/svg+xml" href="tracking-favicon.png" />

        <Header/>
            <div class="tracking-page">
      <div class="order-tracking">
        <Link class="back-to-orders-link link-primary" to="/orders">
          View all orders
        </Link>

        <div class="delivery-date">
          Arriving on Monday, June 13
        </div>

        <div class="product-info">
          Black and Gray Athletic Cotton Socks - 6 Pairs
        </div>

        <div class="product-info">
          Quantity: 1
        </div>

        <img class="product-image" src="images/products/athletic-cotton-socks-6-pairs.jpg" />

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    </div>
        </>
    )
}