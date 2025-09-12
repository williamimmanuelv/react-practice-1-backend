import { Header } from '../../components/Header';
import axios from 'axios'
import './HomePage.css';
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';
export function HomePage({ cart , loadCart}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getHomeDate =  async () => {
      const response = await axios('/api/products') 
        setProducts(response.data);
    };
      getHomeDate();
  },[])
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <title>Ecommerce page</title>

      <Header cart={cart}/>
      <div className="home-page">
        <ProductsGrid products={ products } loadCart={loadCart}/>
      </div>
    </>
  )
}
