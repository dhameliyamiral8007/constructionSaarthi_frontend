// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { baseUrl } from "../../../config/api";

// // Async thunk to fetch inventory
// export const fetchInventory = createAsyncThunk(
//   "inventory/fetchInventory",
//   async (_, thunkAPI) => {
//     const token = localStorage.getItem("token");
//     if (!token) return thunkAPI.rejectWithValue("No token found");

//     try {
//       const res = await fetch(`${baseUrl}/api/inventory/all`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       console.log("API response:", data); // Debug the API response

//       if (!res.ok) {
//         return thunkAPI.rejectWithValue(data.message || "Failed to fetch");
//       }

//       // Return inventoryTypes array
//       return data.inventoryTypes || [];
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.message);
//     }
//   }
// );

// // Create Inventory
// export const createInventory = createAsyncThunk(
//   "inventory/createInventory",
//   async ({ name }, thunkAPI) => {
//     const token = localStorage.getItem("token");
//     if (!token) return thunkAPI.rejectWithValue("No token found");

//     try {
//       const res = await fetch(`${baseUrl}/api/inventory/create`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ name }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         return thunkAPI.rejectWithValue(data.message || "Failed to create");
//       }

//       return data; // created item response
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// const inventorySlice = createSlice({
//   name: "inventory",
//   initialState: {
//     inventoryList: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchInventory.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchInventory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.inventoryList = action.payload;
//       })
//       .addCase(fetchInventory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(createInventory.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createInventory.fulfilled, (state, action) => {
//         state.loading = false;
//         // Add new item to list instantly
//         state.inventoryList.push(action.payload.inventory);
//       })
//       .addCase(createInventory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export default inventorySlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../config/api";

// Fetch Inventory (supports pagination/search)
export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async ({ page = 1, limit = 10, search = "" } = {}, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("No token found");

    try {
      const url = new URL(`${baseUrl}/api/inventory/all`);
      url.searchParams.append("page", page);
      url.searchParams.append("limit", limit);
      if (search) url.searchParams.append("search", search);

      const res = await fetch(url.toString(), {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) return thunkAPI.rejectWithValue(data.message || "Failed to fetch");

      // accept a few payload shapes
      return data;
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
      if (!res.ok) return thunkAPI.rejectWithValue(data.message || "Failed to create");

      // normalize to { inventory }
      return { inventory: data.inventory || data };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
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
      if (!res.ok) return thunkAPI.rejectWithValue(data.message || "Update failed");
      return { inventory: data.inventory || data };
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
      if (!res.ok) return thunkAPI.rejectWithValue(data.message || "Delete failed");
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
    pagination: { page: 1, limit: 10, totalPages: 1, totalRecords: 0 },
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
        // payload may contain list and pagination, accept common shapes
        state.inventoryList = action.payload.inventory || action.payload.inventoryTypes || action.payload.items || action.payload.data || [];
        const p = action.payload.pagination || action.payload.Pagination || {};
        state.pagination = {
          page: p.page || state.pagination.page,
          limit: p.limit || state.pagination.limit,
          totalPages: p.totalPages || state.pagination.totalPages,
          totalRecords: p.totalRecords || state.pagination.totalRecords,
        };
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      // Create
      .addCase(createInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(createInventory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.inventory) state.inventoryList.unshift(action.payload.inventory);
      })
      .addCase(createInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      // Update
      .addCase(updateInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateInventory.fulfilled, (state, action) => {
        state.loading = false;
        const updated = action.payload.inventory;
        const idx = state.inventoryList.findIndex((i) => i.id === updated?.id);
        if (idx !== -1) state.inventoryList[idx] = updated;
      })
      .addCase(updateInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      })

      // Delete
      .addCase(deleteInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.inventoryList = state.inventoryList.filter((i) => i.id !== action.payload);
      })
      .addCase(deleteInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error?.message;
      });
  },
});

export default inventorySlice.reducer;
