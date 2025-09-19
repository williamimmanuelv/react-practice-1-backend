import { Header } from '../../components/Header';
import axios from 'axios'
import './HomePage.css';
import { useEffect, useState } from 'react';
import { ProductsGrid } from './ProductsGrid';
import { useSearchParams } from 'react-router';

export function HomePage({ cart , loadCart}) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    const getHomeDate =  async () => {
      const response = await axios('/api/products') 
        setProducts(response);
    };
      getHomeDate();
  },[])

  // search
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search ? `/api/products?search=${search}`:
      '/api/products';
      const response = await axios.get(urlPath);
      setProducts(response.data)
    };
    getHomeData();
  },[search])
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
