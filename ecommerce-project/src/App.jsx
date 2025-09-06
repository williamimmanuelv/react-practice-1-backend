import { useEffect, useState } from 'react'
import axios from 'axios'
import { Routes , Route} from 'react-router'
import { HomePage } from './pages/home/HomePage'
import { CheckoutPage } from './pages/checkout/ChechoutPage'
import { OrdersPage } from './pages/Orders/OdersPage'
import './App.css'
import { TrackingPage } from './pages/checkout/TrackingPage'
import { NotFound } from './pages/home/NotFound'



function App() {
  const [cart, setcart] = useState([]);

  useEffect(() => {
        const fetchAppData = async() => {
          const response = await axios('/api/cart-items?expand=product') 

          setcart(response.data)
          console.log(response.data); 
        }
        fetchAppData()
  },[])

  return (
    <>  
    <Routes>
      <Route index element={<HomePage cart={ cart }/>}/>
      <Route path='checkout' element={<CheckoutPage cart={ cart }/>}/>
      <Route path='orders' element={<OrdersPage cart={ cart }/>}/>
      <Route path='tracking' element={<TrackingPage/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>

    </>
  )
}

export default App
