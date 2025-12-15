// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}"
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: {
//           light: "#f8fafc",
//           dark: "#0f172a",
//         },
//         surface: {
//           light: "#ffffff",
//           dark: "#020617",
//         },
//         primary: {
//           DEFAULT: "#15803d",
//           hover: "#166534",
//         },
//         text: {
//           light: "#0f172a",
//           dark: "#e5e7eb",
//         },
//         muted: {
//           light: "#64748b",
//           dark: "#94a3b8",
//         },
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: {
          light: "#f8fafc",
          dark: "#0f172a",
        },
        surface: {
          light: "#ffffff",
          dark: "#020617",
        },
        primary: {
          DEFAULT: "#15803d",
          hover: "#166534",
        },
        text: {
          light: "#0f172a",
          dark: "#e5e7eb",
        },
        muted: {
          light: "#64748b",
          dark: "#94a3b8",
        },
      },
    },
  },
  plugins: [],
};