import React from 'react';
import Background from '../components/Background.jsx';
import { currentUser, getFavs } from '../lib/auth.js';
import { artworks } from '../data/artworks.js';

const blocks = {
  Necromancer: ['Users','Artworks','Reports','Ambient Controls'],
  Artist: ['Uploads','Collections','Followers','Earnings'],
  Visitor: ['Favorites','Recently Viewed','Recommendations','Tours'],
  Curator: ['Exhibitions','Insights','Submissions','Events']
};

export default function Dashboard(){
  const user = currentUser();
  const role = user?.role || 'Visitor';
  const items = blocks[role] || blocks.Visitor;
  const favs = getFavs().map(id => artworks.find(a=>a.id===id)).filter(Boolean);

  return (
    <Background>
      <h1 className="text-2xl font-bold mb-4">{role} Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((t,i)=>(
          <div key={i} className="card p-5 card-hover">
            <div className="w-12 h-12 rounded-xl bg-white/10 grid place-items-center mb-2">✨</div>
            <p className="font-semibold">{t}</p>
            <p className="text-sm text-smoke">Feature placeholder.</p>
          </div>
        ))}
      </div>

      <h2 className="mt-8 mb-2 font-semibold">Your Favorites</h2>
      {favs.length? (
        <div className="grid gap-4 md:grid-cols-3">
          {favs.map(f=>(
            <div key={f.id} className="card p-3">
              <img src={f.image} className="h-32 w-full object-cover rounded-xl border border-white/10"/>
              <p className="mt-2">{f.title}</p>
              <p className="text-sm text-smoke">{f.artist}</p>
            </div>
          ))}
        </div>
      ):(<p className="text-sm text-smoke">No favorites yet—visit the Gallery and tap “Save”.</p>)}
    </Background>
  );
}
