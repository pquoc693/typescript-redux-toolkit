import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Product } from '../Product/products.slice'
import { RootState } from '../store'

interface CartProduct extends Product {
  amount: number,
}

const initialState: CartProduct[] = [

]

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const indexProduct = state.findIndex((product) => product.id === action.payload.id)
      if (indexProduct !== -1) {
        state[indexProduct].amount += 1
      } else {
        state.push({ ...action.payload, amount: 1 })
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((item) => item.id === action.payload)
      if (state[index].amount > 1) {
        state[index].amount -= 1
      } else {
        return state.filter((item) => item.id !== action.payload)
      }
    }
  }
})

console.log('cartSlice', cartSlice)

const { actions, reducer } = cartSlice
export const { addToCart, removeFromCart } = actions
export const getCartProduct = (state: RootState) => state.cart
export const getTotalPrice = (state: RootState) => state.cart.reduce((beforeValue, currItem) => beforeValue += currItem.price * currItem.amount, 0)

export default reducer

