// import React, { useContext } from 'react'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const cart = useCart()
  console.log(cart);
  
  const total = cart.items.reduce((a,b) => a + b.price,0)

  return (
    <div className='cart'>
      <h1>Cart Page</h1>
      {cart && cart.items.map((item)=>(
        <li>
          {item.title} - ${item.price}
        </li>
      ))}
      <h3>Total Bill: {total}</h3>

    </div>
  )
}

export default Cart