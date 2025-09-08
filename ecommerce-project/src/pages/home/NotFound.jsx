import { Header } from '../../components/Header';
import './HomePage.css';
export function NotFound( { cart } ){
    return(
        <>
            <Header cart={cart}/>
            <div className='not-found'>
                <h1>404</h1>
                <p> Web page is not found </p>
            </div>
        </>
    )
}