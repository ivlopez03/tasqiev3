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
        
      }
    },
  },
  daisyui: {
    themes : ["pastel"]
  },
  plugins: [
    daisyui,
  ],
}

