import React from "react";
import Background from "../components/Background.jsx";

export default function Contact() {
  return (
    <Background>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-2">
            Contact the gallery team
          </h2>
          <p className="text-sm text-smoke mb-3">
            Have a question about an artwork, exhibition or collaboration? Send
            us a message and we&apos;ll respond as soon as possible.
          </p>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for reaching out to Artisan Gallery.");
            }}
          >
            <div>
              <label className="label">Your Name</label>
              <input className="input" required />
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" type="email" required />
            </div>
            <div>
              <label className="label">Message</label>
              <textarea className="input h-32" required />
            </div>
            <button className="btn btn-primary w-full">Send message</button>
          </form>
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-semibold mb-2">
            Visit (virtual) Artisan Gallery
          </h2>
          <p className="text-sm text-smoke mb-2">
            We are a digital-first space with curators working from multiple
            cities around the world. Our physical archive is based in:
          </p>
          <p className="text-sm text-smoke">
            Artisan Gallery Studio
            <br />
            12 Museum Lane
            <br />
            Art District, 00000
          </p>
          <p className="text-sm text-smoke mt-3">
            Opening hours (online support): Monday – Friday, 10:00 – 18:00.
          </p>
          <p className="text-sm text-smoke mt-3">
            Email: support@artisangallery.example
            <br />
            Phone: +00 000 000 000
          </p>
          <div className="aspect-video rounded-xl border border-white/10 mt-4 flex items-center justify-center text-xs text-smoke/80">
            Interactive map and virtual tour coming soon.
          </div>
        </div>
      </div>
    </Background>
  );
}
