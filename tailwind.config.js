/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primaryTextColor": "#e8488a",
        "secondaryTextColor": "#45aeee",
        "base200": "#f3f3f3",
        "base300": "#d1d1d1",
        "bgNeutralColor": "#cbcbcb"
      }
    },
  },
  daisyui: {
    themes : ["dark", "light","cmyk","corporate"]
  },
  plugins: [
    daisyui,
  ],
}

