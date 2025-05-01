/* eslint-disable no-undef */
import react from '@vitejs/plugin-react-swc'
// eslint-disable-next-line no-unused-vars
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Inspect(), tailwindcss()],
  envPrefix: 'APP_',
})
