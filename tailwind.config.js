/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "descending-icon": "url('/src/images/descending-icon.svg')",
        "search-bar-icon": "url('/src/images/search_bar.svg')",
        "trash-icon": "url('/src/images/trash-icon.svg')",
        "pagination-arrow": "url('/src/images/pagination-arrow.svg')",
      },
      keyframes: {
        pagination_left_hover_keyframes: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-7%)" },
        },
        pagination_right_hover_keyframes: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(7%)" },
        },
      },
      animation: {
        pagination_left_hover:
          "pagination_left_hover_keyframes 1s ease-out infinite",
        pagination_right_hover:
          "pagination_right_hover_keyframes 1s ease-out infinite",
      },
    },
  },
  plugins: [],
};
