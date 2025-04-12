import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler', // or "modern", "legacy"
				// additionalData: `@use "src/variables.scss";`
			}
		}
	},
	server: {
		open: true,
		historyApiFallback: true, // Ensures all routes are served to index.html
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks: undefined, // Optional: Optimize chunking
			},
		},
	},
})
