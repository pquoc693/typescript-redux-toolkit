import React, { HtmlHTMLAttributes, useState } from "react"
import { useAppDispatch, useAppSelector } from "../store.hooks"
import { addProduct, addProductAsync, Product, getErrorMessage } from "./products.slice"

interface ProductFormProps {

}

const ProductForm: React.FC<ProductFormProps> = ({ }) => {

  const dispatch = useAppDispatch()

  const errorMessage = useAppSelector(getErrorMessage)

  const [{ id, title, price }, setProduct] = useState<Product>({
    id: '',
    title: '',
    price: 0
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    console.log('product', { id, title, price }, name, value)
    setProduct(prev => {
      (prev as any)[name] = value
      const newValue = { ...prev }
      return newValue
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(addProductAsync({ id, title, price }))
  }

  return (
    <div>
      <h2>Add new Product form</h2>
      {errorMessage && <span>error: {errorMessage}</span>}
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder="Title" name='title' value={title} onChange={handleChange} />
        <input type='number' placeholder="price" name='price' value={price} onChange={handleChange} />
        <input type='text' placeholder="id" name='id' value={id} onChange={handleChange} />
        <button>Add</button>
      </form>
    </div>
  )
}

export default ProductForm