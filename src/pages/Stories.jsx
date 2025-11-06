import React from 'react';
import Background from '../components/Background.jsx';
import { artworks } from '../data/artworks.js';

export default function Stories(){
  const snippets = artworks.map(a=>({
    id:a.id, image:a.image, title:a.title,
    text: a.lore + ' ' + 'Some nights, the gallery unlocks itself. Footsteps pause, dust listens, and frames lean closer.'
  }));
  return (
    <Background>
      <h1 className="text-2xl font-bold mb-4">Tales of the Night</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {snippets.map(s=>(
          <article key={s.id} className="card p-4">
            <img src={s.image} alt={s.title} className="h-40 w-full object-cover rounded-xl border border-white/10"/>
            <h3 className="mt-3 font-semibold">{s.title}</h3>
            <p className="text-sm text-smoke leading-relaxed">{s.text}</p>
          </article>
        ))}
      </div>
    </Background>
  );
}
