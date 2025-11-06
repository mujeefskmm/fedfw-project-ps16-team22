import React from 'react';
import { isFav, toggleFav } from '../lib/auth.js';

export default function ArtworkCard({ art, onView }){
  const [fav,setFav]=React.useState(isFav(art.id));
  const flip='[transform:rotateY(180deg)]';
  return (
    <div className="group perspective">
      <div className="card relative overflow-hidden card-hover">
        <div className="relative aspect-[4/3] overflow-hidden border-b border-iron">
          <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <span className="absolute top-2 left-2 px-2 py-1 text-xs rounded-md bg-white/10 backdrop-blur border border-white/15">{art.badge}</span>
          <button className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-md ${fav?'bg-blood/70':'bg-white/10'} border border-white/15`}
            onClick={()=>setFav(isFav(art.id)?!toggleFav(art.id):!toggleFav(art.id))}>
            {fav?'♥ Saved':'♡ Save'}
          </button>
        </div>
        <div className="p-4">
          <p className="font-semibold text-ash">{art.title}</p>
          <p className="text-sm text-smoke">{art.artist}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-ember font-medium">{art.price}</span>
            <button className="btn btn-muted" onClick={()=>onView?.(art)}>View</button>
          </div>
          <p className="mt-2 text-xs text-smoke/80">{art.lore}</p>
        </div>
      </div>
    </div>
  );
}
