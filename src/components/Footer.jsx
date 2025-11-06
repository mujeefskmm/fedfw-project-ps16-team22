import React from 'react';
export default function Footer(){
  return (
    <footer className="mt-16 border-t border-iron">
      <div className="container-base py-8 text-sm text-smoke flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} Artisan Gallery — Gothic Revival.</p>
        <p>Built with React, Tailwind & Framer Motion.</p>
      </div>
    </footer>
  );
}
