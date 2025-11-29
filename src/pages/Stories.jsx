import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Background from "../components/Background.jsx";
import { fetchArtworks } from "../store/artworksSlice.js";

export default function Stories() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.artworks);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArtworks());
    }
  }, [status, dispatch]);

  if (status === "loading" && items.length === 0) {
    return (
      <Background>
        <p className="text-center mt-20 text-smoke text-lg">
          Loading stories…
        </p>
      </Background>
    );
  }

  const snippets = items.map((a) => ({
    id: a.id,
    image: a.image,
    title: a.title,
    text:
      a.lore +
      " Each artwork is part of a wider creative journey expressed through colour, form and emotion."
  }));

  return (
    <Background>
      <h1 className="text-2xl font-bold mb-4">Artwork Stories</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {snippets.map((s) => (
          <article key={s.id} className="card p-4">
            <img
              src={s.image}
              alt={s.title}
              className="h-40 w-full object-cover rounded-xl border border-white/10"
            />
            <h3 className="mt-3 font-semibold">{s.title}</h3>
            <p className="text-sm text-smoke leading-relaxed">{s.text}</p>
          </article>
        ))}
      </div>
    </Background>
  );
}
