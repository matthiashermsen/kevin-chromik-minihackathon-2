import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { version } from "./package.json";

export default defineConfig({
	plugins: [react()],
	base: "./",
	define: {
		__APP_VERSION__: JSON.stringify(version),
	},
	server: {
		proxy: {
			"/api": {
				target: "https://api.infomaniak.com",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/api/, ""),
			},
		},
	},
});
