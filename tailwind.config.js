/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx, ts, tsx}"],
  theme: {
    extend: {
      transitionProperty: {
        underline: "width, height",
      },
      transitionDuration: {
        300: "300ms",
      },
      colors: {
        "custom-white": "#ffffff",
      },
    },
  },
  plugins: [],
};
