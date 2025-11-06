import React from 'react';
import Background from '../components/Background.jsx';

const items=[
  {when:'Ongoing', title:'Moonlit Masquerade', blurb:'Masks, mirrors and midnight vows.', emoji:'🎭'},
  {when:'Upcoming', title:'Blood & Canvas', blurb:'Scarlet strokes across velvet air.', emoji:'🩸'},
  {when:'Past', title:'Cathedral Echoes', blurb:'Stone choirs hum to the tides.', emoji:'⛪'},
];

export default function Exhibitions(){
  return (
    <Background>
      <h1 className="text-2xl font-bold mb-4">Exhibitions</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((x,i)=>(
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
