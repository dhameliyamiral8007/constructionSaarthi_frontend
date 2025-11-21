import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../config/api";

// Async thunk to fetch inventory
export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      const res = await fetch(`${baseUrl}/api/inventory/all`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("API response:", data); // Debug the API response

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || "Failed to fetch");
      }

      // Return inventoryTypes array
      return data.inventoryTypes || [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// Create Inventory
export const createInventory = createAsyncThunk(
  "inventory/createInventory",
  async ({ name }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      const res = await fetch(`${baseUrl}/api/inventory/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        return thunkAPI.rejectWithValue(data.message || "Failed to create");
      }

      return data; // created item response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    inventoryList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventoryList = action.payload;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInventory.fulfilled, (state, action) => {
        state.loading = false;
        // Add new item to list instantly
        state.inventoryList.push(action.payload.inventory);
      })
      .addCase(createInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default inventorySlice.reducer;
