import React from "react";
import { Link } from "react-router-dom";
import Background from "../components/Background.jsx";

export default function Home() {
  return (
    <div className="space-y-8">
      <Background>
        <div className="text-center py-16">
          <span className="inline-flex items-center gap-2 text-sm text-ash/80 bg-white/5 rounded-full px-3 py-1 mb-4 border border-white/10">
            Online Museum Experience — Curated for you
          </span>
          <h1
            data-text="Discover Curated Art Online"
            className="glitch text-4xl md:text-5xl font-extrabold"
          >
            Discover Curated Art Online
          </h1>
          <p className="mt-3 text-smoke text-lg max-w-2xl mx-auto">
            Explore a carefully selected collection of portraits, landscapes,
            abstract pieces and digital works. Each artwork is presented with
            museum-style detail and stories from the artists.
          </p>
          <div className="flex gap-3 justify-center mt-6">
            <Link to="/gallery" className="btn btn-primary">
              Browse gallery
            </Link>
            <Link to="/stories" className="btn btn-muted">
              View artwork stories
            </Link>
          </div>
        </div>
      </Background>
    </div>
  );
}
