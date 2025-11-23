import { configureStore } from "@reduxjs/toolkit";
import artworksReducer from "./artworksSlice.js";
import authReducer from "./authSlice.js";
import favouritesReducer from "./favoritesSlice.js";   // ✅ Correct file name

export const store = configureStore({
  reducer: {
    artworks: artworksReducer,
    auth: authReducer,
    favourites: favouritesReducer   // ✅ use same name for slice
  }
});
