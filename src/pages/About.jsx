import React from "react";
import Background from "../components/Background.jsx";

export default function About() {
  return (
    <Background>
      <h1 className="text-2xl font-bold mb-2">About Artisan Gallery</h1>
      <p className="text-smoke max-w-3xl">
        Artisan Gallery is a modern online art space inspired by the calm,
        quiet atmosphere of a museum. Our goal is to make discovering
        contemporary and classic artworks simple, beautiful and accessible from
        any screen.
      </p>
      <p className="text-smoke max-w-3xl mt-3">
        We curate pieces from emerging and established artists around the world.
        Each work is presented with clear details, high-quality imagery and
        short stories that explain the ideas behind the art.
      </p>
      <h2 className="text-lg font-semibold mt-5 mb-2">
        What you can do here
      </h2>
      <ul className="list-disc pl-6 mt-1 text-sm text-smoke space-y-1">
        <li>Browse themed collections: portraits, landscapes, abstract, digital.</li>
        <li>Save your favourite artworks and revisit them later.</li>
        <li>Read short stories and notes from artists and curators.</li>
        <li>Discover upcoming online exhibitions and spotlighted creators.</li>
      </ul>
    </Background>
  );
}
