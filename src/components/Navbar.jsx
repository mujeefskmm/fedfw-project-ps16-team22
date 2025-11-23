import React, { useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice.js";

const link = ({ isActive }) =>
  `px-3 py-2 rounded-lg transition ${
    isActive ? "bg-white/5 text-ash" : "text-smoke hover:bg-white/5"
  }`;

export default function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [museumMode, setMuseumMode] = useState(false);
  const [sound, setSound] = useState(false);
  const audioRef = useRef(null);

  const toggleSound = () => {
    setSound((v) => !v);
    const a = audioRef.current;
    if (!a) return;
    if (!sound) {
      a.volume = 0.2;
      a.loop = true;
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-iron backdrop-blur ${
        museumMode ? "bg-[#101318]/70" : "bg-void/70"
      }`}
    >
      <audio ref={audioRef} src="/audio/ambient.wav" />
      <div className="container-base h-16 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-tight text-ash">
          Artisan Gallery
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/gallery" className={link}>
            Gallery
          </NavLink>
          <NavLink to="/stories" className={link}>
            Stories
          </NavLink>
          <NavLink to="/exhibitions" className={link}>
            Exhibitions
          </NavLink>
          <NavLink to="/about" className={link}>
            About
          </NavLink>
          <NavLink to="/contact" className={link}>
            Contact
          </NavLink>
          {user && (
            <NavLink to="/dashboard" className={link}>
              Dashboard
            </NavLink>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMuseumMode((v) => !v)}
            className="btn btn-muted"
            title="Theme"
          >
            {museumMode ? "Museum Mode 🏛️" : "Classic Mode 🌙"}
          </button>
          <button
            onClick={toggleSound}
            className="btn btn-muted"
            title="Ambient"
          >
            {sound ? "Sound On 🔊" : "Sound Off 🔇"}
          </button>
          {!user ? (
            <>
              <Link className="btn btn-muted" to="/login">
                Log in
              </Link>
              <Link className="btn btn-primary" to="/signup">
                Sign up
              </Link>
            </>
          ) : (
            <>
              <span className="hidden md:inline text-smoke text-sm mr-2">
                Hi, {user.name.split(" ")[0]}
              </span>
              <button
                className="btn btn-muted"
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
