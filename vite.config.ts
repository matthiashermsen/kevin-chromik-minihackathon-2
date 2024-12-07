import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { version } from "./package.json";

export default defineConfig({
	plugins: [react()],
	base: "./",
	define: {
		__APP_VERSION__: JSON.stringify(version),
	}
});
