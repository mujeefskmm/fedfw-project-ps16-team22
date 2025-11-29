import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 🔹 Fetch artworks from public/artworks.json
export const fetchArtworks = createAsyncThunk(
  "artworks/fetchArtworks",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("/artworks.json");
      if (!res.ok) throw new Error("Failed to load artworks");
      const data = await res.json();
      return Array.isArray(data) ? data : [];
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message || "Network error");
    }
  }
);

const initialState = {
  items: [],
  filter: "All",
  selectedId: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null
};

const artworksSlice = createSlice({
  name: "artworks",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
    selectArtwork(state, action) {
      state.selectedId = action.payload; // id or null
    },

    // 🔹 CRUD for Admin Panel (local only)
    addArtwork(state, action) {
      const payload = action.payload;
      const maxId =
        state.items.reduce(
          (max, a) => (Number(a.id) > max ? Number(a.id) : max),
          0
        ) || 0;
      const newArtwork = {
        id: maxId + 1,
        ...payload
      };
      state.items.push(newArtwork);
    },

    updateArtwork(state, action) {
      const updated = action.payload;
      const index = state.items.findIndex((a) => a.id === updated.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updated };
      }
    },

    deleteArtwork(state, action) {
      const id = action.payload;
      state.items = state.items.filter((a) => a.id !== id);
      if (state.selectedId === id) {
        state.selectedId = null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtworks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchArtworks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchArtworks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to load artworks";
      });
  }
});

export const {
  setFilter,
  selectArtwork,
  addArtwork,
  updateArtwork,
  deleteArtwork
} = artworksSlice.actions;

export default artworksSlice.reducer;
