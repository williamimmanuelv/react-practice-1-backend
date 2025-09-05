import { useEffect, useState } from 'react'
import axios from 'axios'
import { Routes , Route} from 'react-router'
import { HomePage } from './pages/HomePage'
import { CheckoutPage } from './pages/checkout/ChechoutPage'
import { OrdersPage } from './pages/OdersPage'
import './App.css'
import { TrackingPage } from './pages/checkout/TrackingPage'
import { NotFound } from './pages/NotFound'



function App() {
  const [cart, setcart] = useState([]);

  useEffect(() => {
        axios('/api/cart-items?expand=product') 
        .then((response => {
          setcart(response.data)
          console.log(response.data);
          
        }) )
  },[])

  return (
    <>  
    <Routes>
      <Route index element={<HomePage cart={cart}/>}/>
      <Route path='checkout' element={<CheckoutPage cart={cart}/>}/>
      <Route path='orders' element={<OrdersPage/>}/>
      <Route path='tracking' element={<TrackingPage/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>

    </>
  )
}

export default App
