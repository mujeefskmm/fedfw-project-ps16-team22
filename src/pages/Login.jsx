import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../components/Background.jsx";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../store/authSlice.js";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((state) => state.auth);

  const handle = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
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
          Welcome back to Artisan Gallery
        </h1>
        <p className="text-sm text-smoke mb-4">
          Sign in to view your saved collections and favourite artworks.
        </p>
        <form onSubmit={handle} className="space-y-3">
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
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button className="btn btn-primary w-full">Sign In</button>
        </form>
        <p className="text-sm text-smoke mt-3">
          New to the gallery?{" "}
          <Link to="/signup" className="text-ash">
            Create an account
          </Link>
        </p>
      </div>
    </Background>
  );
}
