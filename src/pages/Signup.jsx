import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../components/Background.jsx";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearError } from "../store/authSlice.js";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Visitor");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.auth);

  const handle = (e) => {
    e.preventDefault();
    dispatch(signup({ name, email, password, role }));
  };

  useEffect(() => {
    if (user) navigate("/gallery");
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <Background>
      <div className="max-w-md mx-auto card p-6">
        <h1 className="text-xl font-semibold mb-1">
          Create your gallery account
        </h1>
        <p className="text-sm text-smoke mb-4">
          Join as a visitor, artist, curator or collector and start building
          your own curated lists of artworks.
        </p>
        <form onSubmit={handle} className="space-y-3">
          <div>
            <label className="label">Name</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="label">I am a</label>
            <select
              className="input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Visitor</option>
              <option>Artist</option>
              <option>Curator</option>
              <option>Collector</option>
            </select>
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button className="btn btn-primary w-full">Create Account</button>
        </form>
        <p className="text-sm text-smoke mt-3">
          Already have an account?{" "}
          <Link to="/login" className="text-ash">
            Sign in
          </Link>
        </p>
      </div>
    </Background>
  );
}
