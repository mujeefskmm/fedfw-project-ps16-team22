import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Background from "../components/Background.jsx";
import ArtworkCard from "../components/ArtworkCard.jsx";
import {
  setFilter,
  selectArtwork,
  fetchArtworks
} from "../store/artworksSlice.js";

const CATEGORIES = [
  "All",
  "Portraits",
  "Landscapes",
  "Abstract",
  "Digital",
  "Modern",
  "Minimal",
  "Classic"
];

export default function Gallery() {
  const dispatch = useDispatch();

  const { items, filter, selectedId, status, error } = useSelector(
    (state) => state.artworks
  );

  // 🔹 Load from "API" on first mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArtworks());
    }
  }, [status, dispatch]);

  const selected = items.find((a) => a.id === selectedId) || null;

  const filtered = useMemo(
    () =>
      filter === "All"
        ? items
        : items.filter((a) => a.mood?.includes(filter)),
    [items, filter]
  );

  return (
    <Background>
      <header className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Curated Art Collection</h1>
          <p className="text-smoke">
            Filter by style to explore different artworks.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => dispatch(setFilter(c))}
              className={`btn ${
                filter === c ? "btn-primary" : "btn-muted"
              } text-sm`}
            >
              {c}
            </button>
          ))}
        </div>
      </header>

      {status === "loading" && (
        <p className="text-center text-smoke text-lg mt-10">
          Loading artworks…
        </p>
      )}
      {status === "failed" && (
        <p className="text-center text-red-400 mt-10">
          Error: {error || "Could not load artworks."}
        </p>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((art) => (
          <ArtworkCard
            key={art.id}
            art={art}
            onView={() => dispatch(selectArtwork(art.id))}
          />
        ))}
      </div>

      {status === "succeeded" && filtered.length === 0 && (
        <p className="text-sm text-smoke mt-5">
          No artworks match this category.
        </p>
      )}

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => dispatch(selectArtwork(null))}
          />
          <div className="relative w-full max-w-3xl bg-neutral-900 p-6 rounded-xl border border-neutral-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">{selected.title}</h3>
              <button
                className="btn btn-muted"
                onClick={() => dispatch(selectArtwork(null))}
              >
                Close
              </button>
            </div>

            <img
              src={selected.image}
              alt={selected.title}
              className="w-full rounded-lg"
            />
            <p className="text-smoke mt-2">{selected.artist}</p>
            <p className="text-sm mt-1">{selected.lore}</p>
          </div>
        </div>
      )}
    </Background>
  );
}
