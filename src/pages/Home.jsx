import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Background from '../components/Background.jsx';

export default function Home(){
  const [hover,setHover]=useState(false);
  return (
    <div className="space-y-8">
      <Background>
        <div className="text-center py-16">
          <span className="inline-flex items-center gap-2 text-sm text-ash/80 bg-white/5 rounded-full px-3 py-1 mb-4 border border-white/10">
            ☾ Gothic Collection — Enter if you dare
          </span>
          <h1 data-text="Discover Art That Haunts" className="glitch text-4xl md:text-5xl font-extrabold">Discover Art That Haunts</h1>
          <p className="mt-3 text-smoke text-lg max-w-2xl mx-auto">A cinematic dark gallery with mist, moonlight and quiet stories threaded through each frame.</p>
          <div className="flex gap-3 justify-center mt-6">
            <Link to="/gallery" className="btn btn-primary">Enter the Shadows</Link>
            <Link to="/stories" className="btn btn-muted">Tales of the Night</Link>
          </div>
        </div>
      </Background>
    </div>
  );
}
