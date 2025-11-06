import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Background from '../components/Background.jsx';
import { login } from '../lib/auth.js';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [err,setErr] = useState('');
  const navigate = useNavigate();

  const handle = (e)=>{
    e.preventDefault();
    setErr('');
    try{
      login({email,password});
      navigate('/gallery');
    }catch(ex){ setErr(ex.message); }
  }

  return (
    <Background>
      <div className="max-w-md mx-auto card p-6">
        <h1 className="text-xl font-semibold mb-1">Return to the Shadows</h1>
        <p className="text-sm text-smoke mb-4">Sign in to Artisan Gallery</p>
        <form onSubmit={handle} className="space-y-3">
          <div>
            <label className="label">Email</label>
            <input className="input" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="label">Password</label>
            <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          {err && <p className="text-sm text-red-400">{err}</p>}
          <button className="btn btn-primary w-full">Sign In</button>
        </form>
        <p className="text-sm text-smoke mt-3">No account? <Link to="/signup" className="text-ash">Pledge your soul</Link></p>
      </div>
    </Background>
  );
}
