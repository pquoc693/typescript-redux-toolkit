import { createAsyncThunk, createSlice, PayloadAction, createEntityAdapter } from '@reduxjs/toolkit'
import validateProduct from '../fake.api'
import { RootState } from '../store'

export interface Product {
  title: string,
  price: number,
  id: string
}

const initialProduct: Product[] = [
  { title: 'a', price: 60, id: '1' },
  { title: 'b', price: 20, id: '2' },
  { title: 'c', price: 30, id: '3' }
]

export enum ValidationState {
  Fulfilled,
  Pending,
  Rejects
}

interface ProductSliceState {
  // products: Product[],
  validateProduct?: ValidationState,
  errorMessage?: string
}

const productAdapter = createEntityAdapter()

const initialState = productAdapter.getInitialState<ProductSliceState>({
  validateProduct: undefined,
  errorMessage: undefined
})

export const addProductAsync = createAsyncThunk('/products/addProductAsync', async (initialProduct: Product) => {
  const product = await validateProduct(initialProduct)
  return product
})

type entityState = {
  ids: [],
  entities: {}
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      // return [action.payload, ...state]
      state.products.push(action.payload)
    },
    removeProduct: (state, action: PayloadAction<string>) => ({
      ...state,
      products: state.products.filter((item) => item.id !== action.payload)
    })
  },
  extraReducers: builder => {
    builder.addCase(addProductAsync.fulfilled, (state, action) => ({
      ...state,
      validateProduct: ValidationState.Fulfilled,
      errorMessage: undefined,
      products: [...state.products, action.payload]
    }))
    builder.addCase(addProductAsync.rejected, (state, action) => ({
      ...state,
      validateProduct: ValidationState.Rejects,
      errorMessage: action.error.message,
    }))
    builder.addCase(addProductAsync.pending, (state, action) => ({
      ...state,
      validateProduct: ValidationState.Pending,
      errorMessage: undefined,
    }))
  }
})

console.log('productSlice', productSlice)

const { actions, reducer } = productSlice
export const { addProduct, removeProduct } = actions
export const getProduct = (state: RootState) => state.products.products
export const getErrorMessage = (state: RootState) => state.products.errorMessage

export default reducer

