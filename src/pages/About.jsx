import React from 'react';
import Background from '../components/Background.jsx';

export default function About(){
  return (
    <Background>
      <h1 className="text-2xl font-bold mb-2">The Gallery’s Origin</h1>
      <p className="text-smoke max-w-3xl">Raised from ash and echo, the Artisan Gallery is a house for pictures that breathe after dark. Our curators collect fragments of myth, grief and moonlight—then stitch them into rooms. Stay as long as the candles allow.</p>
      <ul className="list-disc pl-6 mt-3 text-sm text-smoke space-y-1">
        <li>Dark-glass UI + fog, bubbles, and glow effects.</li>
        <li>Framer Motion scene transitions.</li>
        <li>LocalStorage auth + Favorites.</li>
        <li>Gothic themes & stories tied to each piece.</li>
      </ul>
    </Background>
  );
}
