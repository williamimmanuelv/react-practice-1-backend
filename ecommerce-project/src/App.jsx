import { useEffect, useState } from 'react'
import axios from 'axios'
import { Routes , Route} from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/CheckoutPage'
import { OrdersPage } from './pages/Orders/OdersPage'
import './App.css'
import { TrackingPage } from './pages/checkout/TrackingPage'
import { NotFound } from './pages/home/NotFound'



function App() {
  const [cart, setcart] = useState([]);
        const loadCart = async() => {
          const response = await axios('/api/cart-items?expand=product') 

          setcart(response.data) 
        }
  useEffect(() => {

        loadCart()
  },[])

  return (
    <>  
    <Routes>
      <Route index element={<HomePage cart={ cart } loadCart= { loadCart } />}/>
      <Route path='checkout' element={<CheckoutPage cart={ cart } loadCart={loadCart}/>}/>
      <Route path='orders' element={<OrdersPage cart={ cart }/>}/>
      <Route path='tracking/:orderId/:productId' element={<TrackingPage cart={cart} />}/>
      <Route path='*' element={<NotFound cart={cart}/>}/>
    </Routes>

    </>
  )
}

export default App
