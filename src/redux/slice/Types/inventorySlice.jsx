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
      const response = await fetch(`${baseUrl}/api/inventory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
      });

      if (!response.ok) {
        const error = await response.json();
        return thunkAPI.rejectWithValue(error.message || 'Failed to create inventory');
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Update Inventory
export const updateInventory = createAsyncThunk(
  "inventory/updateInventory",
  async ({ id, name }, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      const res = await fetch(`${baseUrl}/api/inventory/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();
      if (!res.ok)
        return thunkAPI.rejectWithValue(data.message || "Update failed");
      return data; // updated inventory
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete Inventory
export const deleteInventory = createAsyncThunk(
  "inventory/deleteInventory",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      const res = await fetch(`${baseUrl}/api/inventory/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok)
        return thunkAPI.rejectWithValue(data.message || "Delete failed");
      return id; // return deleted inventory id
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
      // Fetch
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

      // Create
      .addCase(createInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventoryList.push(action.payload.inventory);
      })
      .addCase(createInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.inventoryList.findIndex(
          (i) => i.id === action.payload.inventory.id
        );
        if (idx !== -1) state.inventoryList[idx] = action.payload.inventory;
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventoryList = state.inventoryList.filter(
          (i) => i.id !== action.payload
        );
      })
      .addCase(deleteInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default inventorySlice.reducer;
