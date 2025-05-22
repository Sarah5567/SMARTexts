import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    optimizeDeps: {
        include: ['pdfjs-dist/build/pdf.worker.js'],
    },
    plugins: [
        react(),
        tailwindcss(),
    ],

})


