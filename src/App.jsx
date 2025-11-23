import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import Home from './pages/Home.jsx';
import Gallery from './pages/Gallery.jsx';
import Stories from './pages/Stories.jsx';
import Exhibitions from './pages/Exhibitions.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';


// -------------------------------
// PAGE TRANSITION WRAPPER
// -------------------------------
function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}


// -------------------------------
// ⭐ STARFIELD BACKGROUND
// -------------------------------
function Starfield() {
  const stars = Array.from({ length: 70 }).map((_, i) => {
    const left = Math.random() * 100;
    const delay = Math.random() * 10;
    const size = 1 + Math.random() * 2;

    return (
      <span
        key={i}
        className="star"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${delay}s`,
        }}
      />
    );
  });

  return <div className="background-stars">{stars}</div>;
}


// -------------------------------
// MAIN APP
// -------------------------------
export default function App() {
  return (
    <div className="min-h-screen flex flex-col relative">

      {/* ⭐ GLOBAL STARFIELD BACKGROUND */}
      <Starfield />

      {/* NAVBAR */}
      <Navbar />

      {/* PAGE CONTENT */}
      <main className="flex-1 py-10 relative">
        <div className="container-base space-y-8">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/exhibitions" element={<Exhibitions />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* 404 fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageTransition>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
