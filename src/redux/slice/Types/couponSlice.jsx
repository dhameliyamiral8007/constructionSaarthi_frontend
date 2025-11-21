import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../config/api";

// Async thunk to create a new coupon
export const createCoupon = createAsyncThunk(
  "coupon/createCoupon",
  async ({ name }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token"); // get saved token
      if (!token) return thunkAPI.rejectWithValue("No token found");

      const res = await fetch(`${baseUrl}/api/coupon-type`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // add token here
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to create coupon"
        );
      }

      return data; // created coupon object
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    couponList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.couponList.push(action.payload); // add new coupon to list
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default couponSlice.reducer;
