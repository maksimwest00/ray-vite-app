import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {ENDPOINTS} from "../../config/ENDPOINTS";

export const updateStatus = createAsyncThunk(
  '[PUT] admin/updateStatus',
  async () => {
    const response = await axios.put(`${ENDPOINTS.changeOrderStatus}`)


  }
)

export const getOrderDetails = createAsyncThunk(
  '[GET] admin/getOrderDetails',
  async (id, _) => {
    const response = await axios.get(`${ENDPOINTS.orderDetails}/${id}`)

    return response.data
  }
)

export const getOrders = createAsyncThunk(
  '[get] products/all',
  async () => {
    const response = await axios.get(`${ENDPOINTS.getAllOrders}`);

    return response.data
  }
)

export const getMenu = createAsyncThunk(
  '[GET] admin/menu',
  async () => {
    const response = await axios.get(`${ENDPOINTS.getMenu}`)

    return response.data
  }
)

interface product {
  name: string,
  status: number,

  orders: any,
  ordersStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected',

  menu: any,
  menuStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected',

  orderDetails: any,
  orderDetailsStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: product = {
  name: '',
  status: 1,

  orders: [],
  ordersStatus: 'idle',

  menu: [],
  menuStatus: 'idle',

  orderDetails: [],
  orderDetailsStatus: 'idle'

}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    changeStatus: (state, {payload}) => {
      state.status = payload
    },
    unsetOrderDetails: (state) => {
      state.orderDetailsStatus = 'idle'
      state.orderDetails = []
    }
  },
  extraReducers:(builder) => {
    builder.addCase(getMenu.pending, (state:any) => {
      state.menuStatus = 'pending';
    }),
    builder.addCase(getMenu.fulfilled, (state:any, {payload}) => {
      state.menuStatus = 'fulfilled';
      state.menu = payload;
    }),
    builder.addCase(getMenu.rejected, (state:any) => {
      state.menuStatus = 'rejected';
    }),
    builder.addCase(getOrders.pending, (state:any) => {
      state.ordersStatus = 'pending';
    }),
    builder.addCase(getOrders.fulfilled, (state:any, {payload}) => {
      state.ordersStatus = 'fulfilled';
      state.orders = payload;
    }),
    builder.addCase(getOrders.rejected, (state:any) => {
      state.ordersStatus = 'rejected';
    }),
    builder.addCase(getOrderDetails.pending, (state:any) => {
      state.orderDetailsStatus = 'pending';
    }),
    builder.addCase(getOrderDetails.fulfilled, (state:any, {payload}) => {
      state.orderDetailsStatus = 'fulfilled';
      state.orderDetails = payload;
    }),
    builder.addCase(getOrderDetails.rejected, (state:any) => {
      state.orderDetailsStatus = 'rejected';
    })
  },
})

export const { changeStatus, unsetOrderDetails } = adminSlice.actions

export default adminSlice.reducer
