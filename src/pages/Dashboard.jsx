import React from "react";
import { useSelector } from "react-redux";
import Background from "../components/Background.jsx";

const blocks = {
  Collector: ["Collections", "Saved Artworks", "Recommendations", "Events"],
  Artist: ["Uploads", "Collections", "Followers", "Earnings"],
  Visitor: ["Favourites", "Recently Viewed", "Recommendations", "Tours"],
  Curator: ["Exhibitions", "Insights", "Submissions", "Programs"]
};


export default function Dashboard() {
  const user = useSelector((state) => state.auth.user);
  const favIds = useSelector((state) => state.favorites.ids);
  const artworks = useSelector((state) => state.artworks.items);

  const role = user?.role || "Visitor";
  const items = blocks[role] || blocks.Visitor;
  const favs = artworks.filter((a) => favIds.includes(a.id));

  return (
    <Background>
      <h1 className="text-2xl font-bold mb-4">{role} Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((t, i) => (
          <div key={i} className="card p-5 card-hover">
            <div className="w-12 h-12 rounded-xl bg-white/10 grid place-items-center mb-2">
              ✨
            </div>
            <p className="font-semibold">{t}</p>
            <p className="text-sm text-smoke">Feature placeholder.</p>
          </div>
        ))}
      </div>

      <h2 className="mt-8 mb-2 font-semibold">Your Favourites</h2>
      {favs.length ? (
        <div className="grid gap-4 md:grid-cols-3">
          {favs.map((f) => (
            <div key={f.id} className="card p-3">
              <img
                src={f.image}
                className="h-32 w-full object-cover rounded-xl border border-white/10"
              />
              <p className="mt-2">{f.title}</p>
              <p className="text-sm text-smoke">{f.artist}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-smoke">
          No favourites yet — visit the Gallery and tap “Save”.
        </p>
      )}
    </Background>
  );
}
