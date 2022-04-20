import React from "react"
import { useAppDispatch, useAppSelector } from "../store.hooks"
import { getCartProduct, getTotalPrice, removeFromCart } from "./cart.slice"

interface CartProps {

}

const Cart: React.FC<CartProps> = ({ }) => {
  const cartProducts = useAppSelector(getCartProduct)
  const totalPrice = useAppSelector(getTotalPrice)
  const dispatch = useAppDispatch()
  const handleRemoveFromCart = (id: string) => dispatch(removeFromCart(id))
  return (<div>
    <h2>Cart</h2>
    <h5>{totalPrice}</h5>
    {cartProducts.map((item: any) => (
      <div key={item.id}>
        <span>{item.title}</span>
        <span>{item.amount}</span>
        <button onClick={() => handleRemoveFromCart(item.id)}>Remove from cart</button>
      </div>
    ))}
  </div>)
}

export default Cart