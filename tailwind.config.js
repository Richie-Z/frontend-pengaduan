module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        karla: ["Karla"],
      },
      colors: {
        sidebar: {
          50: "#6f9aff",
          100: "#6590ff",
          200: "#5b86ff",
          300: "#517cff",
          400: "#4772ff",
          500: "#3d68ff",
          600: "#335ef5",
          700: "#2954eb",
          800: "#1f4ae1",
          900: "#1540d7",
        },
      },
    },
  },
  plugins: [],
};
