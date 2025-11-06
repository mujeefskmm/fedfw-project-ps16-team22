import React, { useState, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { currentUser, logout } from '../lib/auth.js';

const link = ({isActive}) => `px-3 py-2 rounded-lg transition ${isActive?'bg-white/5 text-ash':'text-smoke hover:bg-white/5'}`;

export default function Navbar(){
  const user=currentUser(); const navigate=useNavigate();
  const [infernal,setInfernal]=useState(false);
  const [sound,setSound]=useState(false);
  const audioRef=useRef(null);

  const toggleSound=()=>{
    setSound(v=>!v);
    const a=audioRef.current; if(!a) return;
    if(!sound){ a.volume=.2; a.loop=true; a.play().catch(()=>{}) } else { a.pause() }
  };

  return (
    <header className={`sticky top-0 z-40 border-b border-iron backdrop-blur ${infernal?'bg-[#1a0b0b]/70':'bg-void/70'}`}>
      <audio ref={audioRef} src="/audio/ambient.wav" />
      <div className="container-base h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight text-ash">Artisan Gallery</Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/gallery" className={link}>Gallery</NavLink>
          <NavLink to="/stories" className={link}>Stories</NavLink>
          <NavLink to="/exhibitions" className={link}>Exhibitions</NavLink>
          <NavLink to="/about" className={link}>About</NavLink>
          <NavLink to="/contact" className={link}>Contact</NavLink>
          {user && <NavLink to="/dashboard" className={link}>Dashboard</NavLink>}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={()=>setInfernal(v=>!v)} className="btn btn-muted" title="Theme">
            {infernal?'Infernal 🔥':'Gothic 🌙'}
          </button>
          <button onClick={toggleSound} className="btn btn-muted" title="Ambient">{sound?'Sound On 🔊':'Sound Off 🔇'}</button>
          {!user ? (
            <>
              <Link className="btn btn-muted" to="/login">Log in</Link>
              <Link className="btn btn-primary" to="/signup">Sign up</Link>
            </>
          ):(
            <>
              <span className="hidden md:inline text-smoke text-sm mr-2">Hi, {user.name.split(' ')[0]}</span>
              <button className="btn btn-muted" onClick={()=>{logout(); navigate('/')}}>Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
