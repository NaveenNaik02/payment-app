import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react({
      tsDecorators: true, // enables decorators in SWC
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom", "reflect-metadata", "inversify"],
    esbuildOptions: {
      tsconfig: "./tsconfig.app.json",
      loader: {
        ".ts": "tsx",
      },
      target: "es2020",
      supported: {
        decorators: true,
      },
    },
  },
});
