import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Background from '../components/Background.jsx';
import { signup } from '../lib/auth.js';

export default function Signup(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('Visitor');
  const [err,setErr] = useState('');
  const navigate = useNavigate();

  const handle = (e)=>{
    e.preventDefault();
    setErr('');
    try{
      signup({name,email,password,role});
      navigate('/gallery');
    }catch(ex){ setErr(ex.message); }
  }

  return (
    <Background>
      <div className="max-w-md mx-auto card p-6">
        <h1 className="text-xl font-semibold mb-1">Pledge Your Soul</h1>
        <p className="text-sm text-smoke mb-4">Join the Artisan Gallery</p>
        <form onSubmit={handle} className="space-y-3">
          <div><label className="label">Name</label><input className="input" value={name} onChange={e=>setName(e.target.value)} required /></div>
          <div><label className="label">Email</label><input className="input" value={email} onChange={e=>setEmail(e.target.value)} required /></div>
          <div><label className="label">Password</label><input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} required /></div>
          <div>
            <label className="label">I am a</label>
            <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
              <option>Visitor</option>
              <option>Artist</option>
              <option>Curator</option>
              <option>Necromancer</option>
            </select>
          </div>
          {err && <p className="text-sm text-red-400">{err}</p>}
          <button className="btn btn-primary w-full">Create Account</button>
        </form>
        <p className="text-sm text-smoke mt-3">Already sworn? <Link to="/login" className="text-ash">Return here</Link></p>
      </div>
    </Background>
  );
}
