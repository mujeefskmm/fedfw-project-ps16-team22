import React from "react";

export default function Background({ children }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 p-6 md:p-10 bg-[#0b0d11]">

      {/* --- Soft radial spotlight --- */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[900px] h-[900px] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[140px]" />
      </div>

      {/* --- Noise / Grain texture --- */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay"
        style={{
          backgroundImage:
            "url('https://www.transparenttextures.com/patterns/asfalt-light.png')"
        }}
      />

      {/* --- Floating particles --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-white/20 animate-float"
            style={{
              width: 4 + Math.random() * 6 + "px",
              height: 4 + Math.random() * 6 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animationDuration: 6 + Math.random() * 8 + "s",
              animationDelay: Math.random() * 5 + "s",
            }}
          />
        ))}
      </div>

      {/* CONTENT */}
      <div className="relative z-10">{children}</div>

    </section>
  );
}
