import { Header } from '../../components/Header';
import axios from 'axios'
import './HomePage.css';
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';
export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios('/api/products') 
    .then((response => {
      setProducts(response.data);
      console.log(response.data);
      
    }) )
  },[])
  return (
    <>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />
      <title>Ecommerce page</title>

      <Header cart={cart}/>
      <div className="home-page">
        <ProductsGrid products={ products }/>
      </div>
    </>
  )
}
