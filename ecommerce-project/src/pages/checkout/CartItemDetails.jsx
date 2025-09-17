import axios from "axios";
import { formatMoney } from "../../utils/money";
import { useState } from "react";

export function CartItemDetails({ cartItem, loadCart }) {
  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  }
  const [ isUpdate, setIsUpdate ] = useState(false);
  const update = async () => {
    setIsUpdate( !isUpdate);
    if(isUpdate){
      await axios.put(`/api/cart-items/${cartItem.productId}`, {
        quantity: Number(Quantity)
        
      })
      
      setIsUpdate(false)
      await loadCart();
    }
    else{
      setIsUpdate(true)
    }
  }
  const [ Quantity, setQuantity ] = useState(cartItem.quantity);
  const updateQuantity = ( event ) => {
    let a = event.target.value;
    setQuantity( a )
  }


  return (
    <>
      <img className="product-image"
                  src={cartItem.product.image} />
                  
      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: <span className="quantity-label">{!isUpdate && `${cartItem.quantity}`}</span>
          </span>
          <input type="text" value={ Quantity } onChange={ updateQuantity } className="update-quantity-link-Input" style={{ display: !isUpdate ? 'none' : '' }}/>
          <span className="update-quantity-link link-primary" onClick={ update }>
            Update
          </span>
          <span className="delete-quantity-link link-primary"
            onClick={ deleteCartItem }
            >
            Delete
          </span>
        </div>
      </div>
    </>
  );
}