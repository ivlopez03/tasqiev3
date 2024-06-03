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
        "primaryBackground": "#0D1117",
      }
    },
    fontFamily: { "system-ui": ["system-ui", "sans-serif"],
    },
  },
  daisyui: {
    themes : ["dark", "light","cmyk","corporate"]
  },
  plugins: [
    daisyui,
  ],
}

