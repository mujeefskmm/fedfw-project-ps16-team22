import { createSlice } from "@reduxjs/toolkit";

const loadFavs = () => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveFavs = (ids) => {
  try {
    localStorage.setItem("favorites", JSON.stringify(ids));
  } catch {}
};

const initialState = {
  ids: loadFavs() || []
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter((x) => x !== id);
      } else {
        state.ids.push(id);
      }
      saveFavs(state.ids);
    }
  }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
