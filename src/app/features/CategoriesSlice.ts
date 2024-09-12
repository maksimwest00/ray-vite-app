import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from "axios";
import {ENDPOINTS} from "../../config/ENDPOINTS";

export const getCategories = createAsyncThunk(
  '[categories] getCategories',
  async (_,_thunkAPI) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : localStorage.getItem('admin')
    try {
      const response = await axios.get(`${ENDPOINTS.getCategories}`, {
        headers: {
          "authorization": `Bearer ${token}`
        }
      })

      return response.data
    } catch (e: any) {
      console.log('Error')
    }
  })

export interface Menu {
  id: number,
  image: string,
  title: string,
  created_at: string,
  updated_at: string
  categories_id: number | null
}

interface categoriesInterface {
  categories: Menu[],
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: categoriesInterface = {
  categories: [],
  status: 'idle'
}

const categoriesSlice: any = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCategories.pending, (state:any) => {
      state.status = 'pending';
    }),
    builder.addCase(getCategories.fulfilled, (state:any, {payload}) => {
      state.status = 'fulfilled';
      state.categories = payload;
    }),
    builder.addCase(getCategories.rejected, (state:any) => {
      state.status = 'rejected';
    })
  },
})



export default categoriesSlice.reducer

