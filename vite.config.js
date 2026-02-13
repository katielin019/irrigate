import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
    plugins: [svelte()],
    server: {
        open: false,
        port: 4000,
    },
    build: {
        minify: 'terser',
        outDir: 'dist',
    }
});