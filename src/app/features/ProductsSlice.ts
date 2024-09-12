import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {ENDPOINTS} from "../../config/ENDPOINTS";

export interface Menu {
  id: number,
  image: string,
  title: string,
  created_at: string,
  updated_at: string
  categories_id: number | null
}


export const getProducts = createAsyncThunk(
  '[products] getProducts',
  async (_,thunkAPI) => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(`${ENDPOINTS.getProducts}`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      })

      return response.data
    } catch (e: any) {
      console.log('Error')
    }

  })

interface initialStateInterface {
  products: any,
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: initialStateInterface = {
  products: [],
  status: 'idle'
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(getProducts.pending, (state:any) => {
      state.status = 'pending';
    }),
    builder.addCase(getProducts.fulfilled, (state:any, {payload}: any) => {
      state.status = 'fulfilled';
      state.products = payload;
    }),
    builder.addCase(getProducts.rejected, (state:any) => {
      state.status = 'rejected';
    });
  },
})



export default productsSlice.reducer

