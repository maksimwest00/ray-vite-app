import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {ENDPOINTS} from "../../config/ENDPOINTS";
import axios from "axios";

import {jwtDecode} from "jwt-decode";

export const getUserOrders = createAsyncThunk(
  '[order] order/getOrders',
  async () => {
    const token:any = localStorage.getItem('token')
    const tk_values: any = jwtDecode(token)
    const response = await axios.get(`${ENDPOINTS.getUserOrders}/${tk_values.id}`, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
    return response.data
  }
)

export const confirmOrder = createAsyncThunk(
  '[order] order/confirmOrder',
  async (orderDetails: any) => {
    const token:any = localStorage.getItem('token')
    // @ts-ignore
    const tk_response: any = await jwtDecode(token)

    orderDetails.cartItems =  orderDetails.cartItems.map((item: any) => {
      return {
        title: item.title,
        product_id: item.id,
        quantity: item.counter,
        price: item.price,
      }
    })

    orderDetails.userDetails['user_id'] = tk_response.id
    orderDetails.userDetails['name'] = tk_response.name

    const response = await axios.post(`${ENDPOINTS.confirmOrder}`, {
      orderDetails
    }, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    })
    return response.data
  }
)

interface orderInterface {
  orders: any[],
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected',
  currentOrders: any[],
  confirmStatus: 'idle'| 'pending' | 'fulfilled' | 'rejected',
}

const initialState: orderInterface = {
  orders: [],
  status: 'idle',
  currentOrders: [],
  confirmStatus: 'idle'
}

const orderSlice: any = createSlice({
    name: 'order',
    initialState,
    reducers: {
      saveOrder: (state, {payload}) => {
        state.currentOrders = payload
      },
      makeAnOrder: (state, {payload}) => {
        console.log('ordering')
      },
      clearStatus: (state) => {
        state.confirmStatus = 'idle'
      }
    },
    extraReducers:(builder) => {
      builder.addCase(getUserOrders.pending, (state:any, {payload}) => {
        state.status = 'pending';
      }),
      builder.addCase(getUserOrders.fulfilled, (state:any, {payload}) => {
        state.status = 'fulfilled';
        let res: any = {};
        payload.forEach((item: any) => {
            let dateWithoutTime = item.created_at;
            if ( !res[dateWithoutTime] ) {
              res[dateWithoutTime] = [];
            }
            res[dateWithoutTime].push(item);
          }
        )
        state.orders = res;
      }),
      builder.addCase(getUserOrders.rejected, (state:any, {payload}) => {
        state.status = 'rejected';
      }),
      builder.addCase(confirmOrder.pending, (state:any, {payload}) => {
        state.confirmStatus = 'pending';
        console.log(payload);
      }),
      builder.addCase(confirmOrder.fulfilled, (state:any, {payload}) => {
        state.confirmStatus = 'fulfilled';
        console.log(payload);
      }),
      builder.addCase(confirmOrder.rejected, (state:any, {payload}) => {
        state.confirmStatus = 'rejected';
      });
    },
  }
)

export const {makeAnOrder, saveOrder, clearStatus} = orderSlice.actions

export default orderSlice.reducer
