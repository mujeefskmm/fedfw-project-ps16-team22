import React from 'react';

export default function Background({ children }){
  // generate bubbles
  const b = Array.from({length:24}).map((_,i)=>{
    const left = Math.random()*100;
    const size = 8 + Math.random()*22;
    const delay = Math.random()*10;
    const duration = 18 + Math.random()*24;
    const opacity = 0.04 + Math.random()*0.12;
    return {left,size,delay,duration,opacity,i};
  });
  return (
    <section className="scene relative rounded-2xl border border-iron p-6 md:p-8 overflow-hidden">
      <div className="bubbles absolute inset-0">
        {b.map(x=>(
          <span key={x.i} className="bubble"
            style={{left:`${x.left}%`,width:x.size,height:x.size,animationDelay:`${x.delay}s`,animationDuration:`${x.duration}s`,background:`rgba(255,255,255,${x.opacity})`}}/>
        ))}
      </div>
      <div className="watermark select-none">ARTISAN</div>
      <div className="relative">{children}</div>
    </section>
  );
}
