import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";
import {ENDPOINTS} from "../../config/ENDPOINTS";

import {jwtDecode} from "jwt-decode";


export const getUserDetails = createAsyncThunk(
  '[GET] user/userDetails',
  async () => {
    const token:any = localStorage.getItem('token')
    const tk_values: any = jwtDecode(token)

    const response = await axios.get(`${ENDPOINTS.userDetails}/${tk_values.id}`, {
      headers: {
        "authorization": `Bearer ${token}`
      }
    })

    return response.data
  }
)

interface userDetailsInterface {
  user: any,
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: userDetailsInterface = {
  user: {},
  status: 'idle'
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers:(builder) => {
    builder.addCase(getUserDetails.pending, (state:any) => {
      state.status = 'pending';
    }),
    builder.addCase(getUserDetails.fulfilled, (state:any, {payload}: any) => {
      state.status = 'fulfilled';
      state.user = payload[0];
    }),
    builder.addCase(getUserDetails.rejected, (state:any) => {
      state.status = 'rejected';
    });
  },
})


export default userSlice.reducer
