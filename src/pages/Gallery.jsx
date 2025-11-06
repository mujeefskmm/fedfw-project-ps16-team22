import React, { useMemo, useState } from 'react';
import Background from '../components/Background.jsx';
import ArtworkCard from '../components/ArtworkCard.jsx';
import { artworks } from '../data/artworks.js';

const MOODS = ['All','Mystic','Haunted','Forbidden','Melancholy'];

export default function Gallery(){
  const [selected, setSelected] = useState(null);
  const [mood,setMood]=useState('All');
  const filtered = useMemo(()=> mood==='All'?artworks:artworks.filter(a=>a.mood?.includes(mood)),[mood]);

  return (
    <Background>
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gallery</h1>
          <p className="text-smoke">Filter by mood to change the vibe.</p>
        </div>
        <div className="flex gap-2">
          {MOODS.map(m=>(
            <button key={m} onClick={()=>setMood(m)} className={`btn ${mood===m?'btn-primary':'btn-muted'} text-sm`}>{m}</button>
          ))}
        </div>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(a => <ArtworkCard key={a.id} art={a} onView={setSelected} />)}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={()=>setSelected(null)}/>
          <div className="relative w-full max-w-3xl card p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">{selected.title}</h3>
              <button className="btn btn-muted" onClick={()=>setSelected(null)}>Close</button>
            </div>
            <img src={selected.image} alt={selected.title} className="w-full rounded-xl border border-white/10" />
            <p className="text-smoke mt-2">{selected.artist}</p>
            <p className="text-sm mt-1">{selected.lore}</p>
          </div>
        </div>
      )}
    </Background>
  );
}
