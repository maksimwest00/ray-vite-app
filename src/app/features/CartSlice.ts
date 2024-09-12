import {createSlice} from "@reduxjs/toolkit";

interface CartStateType {
  cartItems: any[],
  amount: number,
  total: number,
}

const initialState: CartStateType = {
  cartItems: [],
  amount: 0,
  total: 0,
}

const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addProduct: (state, {payload}) => {
      let existedProduct = state.cartItems.find((item: any) => item.id === payload.id)

      if(existedProduct) {
        existedProduct['counter'] = existedProduct.counter + payload.counter
      } else {
        state.cartItems.push(payload)
      }
    },
    deleteProduct: (state, {payload}) => {
      state.cartItems = state.cartItems.filter((item: any) => item.id !== payload.id)
    },
    increment: (state, {payload}) => {
      let existedProduct = state.cartItems.find((item: any) => item.id === payload.id)
      if(existedProduct) {
        existedProduct['counter'] = existedProduct['counter'] + 1
      }
    },
    decrement: (state, {payload}) => {
      let existedProduct = state.cartItems.find((item: any) => item.id === payload.id)
      if(existedProduct && existedProduct["counter"] > 1) {
        existedProduct['counter'] = existedProduct['counter'] - 1
      }
    },
    countTotalAndAmount: (state) => {
      state.amount = state.cartItems.reduce((prev,curr) => prev + curr.counter, 0)
      state.total = Number(state.cartItems.reduce((prev, curr) => {
        return prev + (curr.counter * curr.price)
      }, 0))
    },
    clearAll: (state) => {
      state.cartItems = []
      state.amount = 0
      state.total = 0
    }
  }
})

export const {addProduct, deleteProduct, increment, decrement, countTotalAndAmount, clearAll} = cartSlice.actions

export default cartSlice.reducer
