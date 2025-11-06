import React from 'react';
import Background from '../components/Background.jsx';

export default function Contact(){
  return (
    <Background>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-2">Send a Raven</h2>
          <form className="space-y-3" onSubmit={(e)=>{e.preventDefault(); alert('The raven has your message.')}}>
            <div><label className="label">Your Name</label><input className="input" required /></div>
            <div><label className="label">Email</label><input className="input" type="email" required /></div>
            <div><label className="label">Message</label><textarea className="input h-32" required /></div>
            <button className="btn btn-primary w-full">Dispatch</button>
          </form>
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-2">Visit Us</h2>
          <div className="aspect-video rounded-xl border border-white/10 grid place-items-center text-smoke">A fog rolls over the map… coming soon.</div>
        </div>
      </div>
    </Background>
  );
}
