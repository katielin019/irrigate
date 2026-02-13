import { defineConfig } from "vite";

export default defineConfig({
    server: {
        open: false,
        port: 4000,
    },
    build: {
        minify: 'terser',
        outDir: 'dist',
    }
});