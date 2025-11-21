import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../config/api";
import { apiInstance } from "../../../config/axiosInstance";

export const fetchAllGavge = createAsyncThunk(
  "gavge/fetchAllGavge",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found, please login first.");
    }
    try {
      const response = await fetch(`${baseUrl}/api/gauge-type/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addGavgeType = createAsyncThunk(
  "gavge/addGavgeType",
  async (payload, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      const response = await fetch(`${baseUrl}/api/gauge-type/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok)
        return thunkAPI.rejectWithValue(data.message || "Create failed");

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateGavge = createAsyncThunk(
  "gavge/updateGavge",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await apiInstance.put(
        `${baseUrl}/api/gauge-type/update/${id}`,
        updatedData
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteGavge = createAsyncThunk(
  "gavge/deleteGavge",
  async (id, thunkAPI) => {
    try {
      await apiInstance.delete(`${baseUrl}/api/gauge-type/delete/${id}`);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const gavgeSlice = createSlice({
  name: "gavge",
  initialState: {
    Gavges: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllGavge.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllGavge.fulfilled, (state, action) => {
        state.Gavges = action.payload.gavgeTypes || [];
        state.loading = false;
      })
      .addCase(fetchAllGavge.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addGavgeType.fulfilled, (state, action) => {
        state.Gavges.push(action.payload.data);
      })
      .addCase(deleteGavge.fulfilled, (state, action) => {
        state.Gavges = state.Gavges.filter(
          (g) => g.id !== action.payload.id
        );
      });
  },
});

export default gavgeSlice.reducer;
