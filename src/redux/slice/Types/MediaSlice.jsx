import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../config/api";
import { apiInstance } from "../../../config/axiosInstance";

export const fetchAllMedia = createAsyncThunk(
  "media/fetchAllMedia",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("No token found, please login first.");
    }
    try {
      const response = await fetch(`${baseUrl}/api/media/media-types`, {
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

export const addMedia = createAsyncThunk(
  "media/addMediaType",
  async ({ name, description }, thunkAPI) => {
    try {
      const res = await apiInstance.post(`${baseUrl}/api/media/media-types`, {
        name,
        description,
      });
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateMedia = createAsyncThunk(
  "media/updateMedia",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      const response = await apiInstance.put(
        `${baseUrl}/api/media/media-types/${id}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteMedia = createAsyncThunk(
  "media/deleteMedia",
  async (id, thunkAPI) => {
    try {
      await apiInstance.delete(`${baseUrl}/api/media/media-types/${id}`);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    mediaTypes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllMedia.fulfilled, (state, action) => {
        state.mediaTypes = action.payload.mediaTypes;
        state.loading = false;
      })
      .addCase(fetchAllMedia.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(addMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(addMedia.fulfilled, (state, action) => {
        state.mediaTypes.push(action.payload);
        state.loading = false;
      })
      .addCase(addMedia.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      .addCase(updateMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateMedia.fulfilled, (state, action) => {
        const index = state.mediaTypes.findIndex(
          (media) => media.id === action.payload.id
        );
        if (index !== -1) {
          state.mediaTypes[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateMedia.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
        state.loading = false;
      })
      .addCase(deleteMedia.fulfilled, (state, action) => {
        state.mediaTypes = state.mediaTypes.filter(
          (media) => media.id !== action.payload.id
        );
      });
  },
});

export default mediaSlice.reducer;
