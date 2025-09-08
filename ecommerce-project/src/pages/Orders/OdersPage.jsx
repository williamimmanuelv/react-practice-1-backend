import axios from 'axios';
import { Header } from '../../components/Header';
import './OrdersPage.css'
import { Fragment, useEffect, useState } from 'react';
import { OrdersGrid } from './OrdersGrid';
export function OrdersPage({ cart }) {
  const [ orders, setOrders ] = useState([]);
  useEffect(() => {
    const getOderData = async () => {
      const response = await axios.get('/api/orders?expand=products')

        setOrders(response.data)
    }
    getOderData();
  }, [])
  return (
    <>

      <title>Orders</title>

      <link rel="icon" type="image/svg+xml" href="orders-favicon.png" />

      <Header cart={cart} />

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

        <OrdersGrid orders={ orders }/>
      </div>
    </>
  )
}