import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Background from "../components/Background.jsx";
import { useDispatch, useSelector } from "react-redux";
import { signup, clearError } from "../store/authSlice.js";

export default function Signup() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Visitor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error } = useSelector((s) => s.auth);

  const handle = (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setLocalError("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      setLocalError("Email format is invalid.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    setLocalError("");
    dispatch(signup({ name, email, password, role }));
  };

  useEffect(() => {
    if (user) navigate("/gallery");
  }, [user, navigate]);

  useEffect(
    () => () => {
      dispatch(clearError());
    },
    [dispatch]
  );

  return (
    <Background>
      <div className="max-w-md mx-auto card p-6">
        <h1 className="text-xl font-semibold mb-1">
          Create your gallery account
        </h1>
        <p className="text-sm text-smoke mb-4">
          Join as a visitor, artist, curator, collector or admin and build your
          own curated lists of artworks.
        </p>
        <form onSubmit={handle} className="space-y-3">
          <div>
            <label className="label">Name</label>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Email</label>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              <option>Admin</option> {/* 🔹 NEW */}
            </select>
          </div>
          {(localError || error) && (
            <p className="text-sm text-red-400">{localError || error}</p>
          )}
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
