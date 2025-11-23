import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/favoritesSlice.js"; // ✔ Correct import

export default function ArtworkCard({ art, onView }) {
  const dispatch = useDispatch();

  // ✔ Prevent crash if favorites is not ready yet
  const favIds = useSelector((state) => state.favorites?.ids || []);

  const fav = favIds.includes(art.id);

  const handleFav = () => {
    dispatch(toggleFavorite(art.id)); // ✔ Correct action name
  };

  return (
    <div className="group perspective">
      <div className="card relative overflow-hidden card-hover">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-iron">
          <img
            src={art.image}
            alt={art.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute top-2 left-2 px-2 py-1 text-xs rounded-md bg-white/10 backdrop-blur border border-white/15">
            {art.badge}
          </span>

          <button
            className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-md ${
              fav ? "bg-red-500/70" : "bg-white/10"
            } border border-white/15`}
            onClick={handleFav} // ✔ Fixed (was nClick)
          >
            {fav ? "♥ Saved" : "♡ Save"}
          </button>
        </div>

        <div className="p-4">
          <p className="font-semibold text-ash">{art.title}</p>
          <p className="text-sm text-smoke">{art.artist}</p>

          <div className="flex items-center justify-between mt-3">
            <span className="text-ember font-medium">{art.price}</span>
            <button className="btn btn-muted" onClick={onView}>
              View
            </button>
          </div>

          <p className="mt-2 text-xs text-smoke/80">{art.lore}</p>
        </div>
      </div>
    </div>
  );
}
