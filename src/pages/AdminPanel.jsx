import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Background from "../components/Background.jsx";
import {
  fetchArtworks,
  addArtwork,
  updateArtwork,
  deleteArtwork
} from "../store/artworksSlice.js";

export default function AdminPanel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state?.auth?.user || null);
  const { items: artworks, status, error } = useSelector(
    (state) => state?.artworks || { items: [], status: "idle", error: null }
  );

  // If not logged in, push to login
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Load artworks from "API"
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchArtworks());
    }
  }, [status, dispatch]);

  // If logged in but not Admin
  if (!user) {
    return null;
  }

  if (user.role !== "Admin") {
    return (
      <Background>
        <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
        <p className="text-sm text-smoke">
          Access denied. Only <span className="font-semibold">Admin</span> users
          can manage the art collection.
        </p>
      </Background>
    );
  }

  // ---------- Local form state ----------
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: "",
    artist: "",
    badge: "",
    mood: "",
    price: "",
    image: "",
    lore: ""
  });

  const resetForm = () => {
    setEditing(null);
    setForm({
      title: "",
      artist: "",
      badge: "",
      mood: "",
      price: "",
      image: "",
      lore: ""
    });
  };

  const startEdit = (art) => {
    setEditing(art);
    setForm({
      title: art.title || "",
      artist: art.artist || "",
      badge: art.badge || "",
      mood: art.mood ? art.mood.join(", ") : "",
      price: art.price || "",
      image: art.image || "",
      lore: art.lore || ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.artist.trim()) {
      alert("Title and Artist are required.");
      return;
    }

    const payload = {
      title: form.title.trim(),
      artist: form.artist.trim(),
      badge: form.badge.trim(),
      price: form.price.trim(),
      image: form.image.trim(),
      lore: form.lore.trim(),
      mood: form.mood
        .split(",")
        .map((m) => m.trim())
        .filter(Boolean)
    };

    if (editing) {
      dispatch(updateArtwork({ id: editing.id, ...payload }));
    } else {
      dispatch(addArtwork(payload));
    }
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this artwork?")) {
      dispatch(deleteArtwork(id));
    }
  };

  return (
    <Background>
      <h1 className="text-2xl font-bold mb-4">Admin Panel — Manage Artworks</h1>

      {status === "loading" && (
        <p className="text-sm text-smoke mb-4">Loading artworks from API…</p>
      )}
      {status === "failed" && (
        <p className="text-sm text-red-400 mb-4">
          Error: {error || "Could not load artworks."}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-5 space-y-3">
          <h3 className="font-semibold mb-1">
            {editing ? "Edit Artwork" : "Add New Artwork"}
          </h3>

          <div>
            <label className="label">Title</label>
            <input
              className="input"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="label">Artist</label>
            <input
              className="input"
              name="artist"
              value={form.artist}
              onChange={handleChange}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Badge / Movement</label>
              <input
                className="input"
                name="badge"
                value={form.badge}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="label">Price Label</label>
              <input
                className="input"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="$120M"
              />
            </div>
          </div>

          <div>
            <label className="label">
              Mood / Categories{" "}
              <span className="text-xs text-smoke">
                (comma separated, e.g. Portraits, Modern)
              </span>
            </label>
            <input
              className="input"
              name="mood"
              value={form.mood}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="label">Image URL</label>
            <input
              className="input"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://…"
            />
          </div>

          <div>
            <label className="label">Story / Description</label>
            <textarea
              className="input h-24"
              name="lore"
              value={form.lore}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            {editing && (
              <button
                type="button"
                className="btn btn-muted"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              {editing ? "Save Changes" : "Add Artwork"}
            </button>
          </div>
        </form>

        {/* List */}
        <div className="card p-5 space-y-3 max-h-[520px] overflow-auto">
          <h3 className="font-semibold mb-1">Collection Overview</h3>
          {Array.isArray(artworks) && artworks.length > 0 ? (
            artworks.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-3 border-b border-white/5 pb-3 last:border-0 last:pb-0"
              >
                <img
                  src={a.image}
                  alt={a.title}
                  className="w-16 h-16 rounded-lg object-cover border border-white/10"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{a.title}</p>
                  <p className="text-xs text-smoke">
                    {a.artist} · {a.badge}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    className="btn btn-muted text-xs"
                    onClick={() => startEdit(a)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-muted text-xs"
                    onClick={() => handleDelete(a.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-smoke">
              No artworks available yet — add one using the form.
            </p>
          )}
        </div>
      </div>
    </Background>
  );
}
