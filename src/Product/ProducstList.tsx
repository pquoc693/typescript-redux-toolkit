import React, { useState } from "react"
import { useSelector } from "react-redux"
import { addToCart } from "../Cart/cart.slice"
import { useAppDispatch } from "../store.hooks"
import { getProduct, Product, removeProduct } from "./products.slice"

interface ProductsListProps {

}

export const ProductsList: React.FC<ProductsListProps> = ({ }) => {
  const products = useSelector(getProduct)
  const dispatch = useAppDispatch()
  const handleRemove = (id: string) => {
    dispatch(removeProduct(id))
  }

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product))
  }

  console.log('products', products)

  return (
    <div>
      <h2>Product List</h2>
      {products.map((item: any) => (
        <div key={item.id}>
          <span>{item.title}: {item.price}</span>
          <button onClick={() => handleRemove(item?.id)}>Remove from store</button>
          <button onClick={() => handleAddToCart(item)}>Add to Cart </button>
        </div>
      ))}
    </div>
  )
}