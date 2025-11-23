import { createSlice } from "@reduxjs/toolkit";
import { artworks as initialArtworks } from "../data/artworks.js";

const initialState = {
  items: initialArtworks,
  filter: "All",
  selectedId: null
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
    }
  }
});

export const { setFilter, selectArtwork } = artworksSlice.actions;

export default artworksSlice.reducer;
