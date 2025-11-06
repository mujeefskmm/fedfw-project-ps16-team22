/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        void: "#0a0a0d",
        onyx: "#111116",
        iron: "#1a1a22",
        ash: "#f5f5f7",
        smoke: "#a1a1aa",
        blood: "#d14c5a",
        amethyst: "#9b84ff",
        ember: "#ffae5e"
      },
      boxShadow: {
        glass: "0 12px 50px rgba(0,0,0,.55)",
        glow: "0 0 40px rgba(155,132,255,.18)"
      }
    }
  },
  plugins: []
}
