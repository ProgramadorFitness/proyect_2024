import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['vuetify'],
    entries: ['./src/**/*.{vue,js,jsx,ts,tsx}'],
    // or include: ['vuetify'], ?
  },
  
})
