import React from "react";
import Background from "../components/Background.jsx";

const items = [
  {
    when: "Ongoing",
    title: "Modern Masters",
    blurb: "A rotating selection of contemporary abstract and digital works.",
    emoji: "🖼️"
  },
  {
    when: "Upcoming",
    title: "Portraits & Personalities",
    blurb: "Painted and photographic portraits from global artists.",
    emoji: "🧑‍🎨"
  },
  {
    when: "Past",
    title: "Landscapes in Light",
    blurb: "Calm mountains, oceans and cities captured in soft colour.",
    emoji: "🏞️"
  }
];

export default function Exhibitions() {
  return (
    <Background>
      <h1 className="text-2xl font-bold mb-4">Exhibitions</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((x, i) => (
          <div key={i} className="card p-5 card-hover">
            <div className="text-3xl">{x.emoji}</div>
            <p className="mt-2 font-semibold">{x.title}</p>
            <p className="text-sm text-smoke">{x.when}</p>
            <p className="text-sm mt-2">{x.blurb}</p>
          </div>
        ))}
      </div>
    </Background>
  );
}
